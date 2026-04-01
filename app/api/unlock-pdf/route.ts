import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "No PDF file provided." },
        { status: 400 }
      );
    }

    // Read the file directly into Vercel's RAM (No file system writing required)
    const arrayBuffer = await file.arrayBuffer();

    let pdfDoc;
    try {
      // Attempt to load the PDF into memory
      // Automatically strips Owner Passwords. Decrypts User Passwords if provided.
      pdfDoc = await PDFDocument.load(arrayBuffer, {
        password: password || "",
        updateMetadata: false,
      });
    } catch (error: any) {
      const errorMessage = error.message?.toLowerCase() || "";
      
      // Catch strict encryption that requires a password
      if (errorMessage.includes("encrypted") || errorMessage.includes("password")) {
        return NextResponse.json(
          { 
            error: "USER_PASSWORD_REQUIRED", 
            message: "Strict encryption detected or incorrect password. Please try again." 
          },
          { status: 401 }
        );
      }
      
      // Catch malformed PDFs
      return NextResponse.json(
        { error: "FILE_CORRUPTED", message: "Failed to read PDF file. It might be corrupted or use unsupported AES-256 encryption." },
        { status: 400 }
      );
    }

    // Saving the loaded document automatically strips restrictions
    const pdfBytes = await pdfDoc.save();

    // Return the clean buffer back to the client directly from memory
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error) {
    console.error("Vercel PDF Unlock API Error:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "An unexpected server error occurred while processing the PDF." },
      { status: 500 }
    );
  }
}