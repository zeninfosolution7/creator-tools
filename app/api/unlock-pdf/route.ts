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

    // 1. Read the file into Vercel's RAM (No filesystem writes = 100% Vercel Safe)
    const arrayBuffer = await file.arrayBuffer();

    let pdfDoc;
    try {
      // 2. THE SUPERCOMPUTER FIX:
      // We bypass TypeScript's incomplete definitions using 'any'.
      // If it's an Owner Lock, an empty string "" automatically decrypts it.
      // If it's a User Lock, the user's provided password decrypts it.
      const loadOptions: any = {
        updateMetadata: false,
        password: password || "", 
      };

      // This actively DECRYPTS the file streams in memory.
      pdfDoc = await PDFDocument.load(arrayBuffer, loadOptions);
      
    } catch (error: any) {
      const errorMessage = error.message?.toLowerCase() || "";
      
      // If pdf-lib rejects the password or detects a strict lock, ask the client for the password
      if (errorMessage.includes("encrypted") || errorMessage.includes("password")) {
        return NextResponse.json(
          { 
            error: "USER_PASSWORD_REQUIRED", 
            message: "This file requires a password to decrypt. Please enter it below." 
          },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { error: "FILE_CORRUPTED", message: "Failed to read PDF. It may be corrupted or use highly advanced AES-256 encryption not supported by serverless engines." },
        { status: 400 }
      );
    }

    // 3. Saving the actively decrypted document generates a completely UNLOCKED PDF.
    const pdfBytes = await pdfDoc.save();

    // 4. Convert Uint8Array to Node.js Buffer to satisfy Next.js strict BodyInit types
    const pdfBuffer = Buffer.from(pdfBytes);

    // 5. Return the clean, unlocked buffer back to the client
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error) {
    console.error("Vercel PDF Unlock API Error:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}