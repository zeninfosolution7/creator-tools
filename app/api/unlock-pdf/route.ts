import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "No PDF file provided." },
        { status: 400 }
      );
    }

    // Read the file directly into Vercel's RAM
    const arrayBuffer = await file.arrayBuffer();

    let pdfDoc;
    try {
      // Load the PDF into memory.
      // ignoreEncryption: true officially bypasses and strips "Owner Passwords" (Editing/Printing locks).
      // Note: pdf-lib cannot decrypt strict "User Passwords" (AES encryption).
      pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
        updateMetadata: false,
      });
    } catch (error: any) {
      const errorMessage = error.message?.toLowerCase() || "";
      
      // If pdf-lib fails with an encryption error, it means it's a hard "User Password"
      if (errorMessage.includes("encrypted")) {
        return NextResponse.json(
          { 
            error: "USER_PASSWORD_REQUIRED", 
            message: "This file has strict cryptographic encryption (User Password). This serverless tool only supports removing standard editing, printing, and copying restrictions." 
          },
          { status: 401 }
        );
      }
      
      // Catch malformed PDFs
      return NextResponse.json(
        { error: "FILE_CORRUPTED", message: "Failed to read PDF file. It might be corrupted." },
        { status: 400 }
      );
    }

    // Saving the loaded document automatically finalizes the removal of the owner restrictions
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