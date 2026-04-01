import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { existsSync } from "fs";

// Promisify execFile for clean async/await syntax
const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  let inputPath = "";
  let outputPath = "";

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // CRITICAL FIX: Use a local tmp directory inside the project to avoid Windows AppData path space issues
    const tmpDir = path.join(process.cwd(), "tmp");
    if (!existsSync(tmpDir)) {
      await mkdir(tmpDir, { recursive: true });
    }

    // Generate unique filenames to prevent conflicts
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    inputPath = path.join(tmpDir, `input-${uniqueId}.pdf`);
    outputPath = path.join(tmpDir, `output-${uniqueId}.pdf`);

    // Write the uploaded PDF to our safe local temp directory
    await writeFile(inputPath, buffer);

    // Prepare robust qpdf arguments
    const args = [];
    
    // If a User Password was provided, append it securely
    if (password) {
      args.push(`--password=${password}`);
    }
    
    // --decrypt automatically strips Owner Passwords and decrypts User Passwords
    args.push("--decrypt", inputPath, outputPath);

    try {
      // Execute qpdf securely using execFile
      await execFileAsync("qpdf", args);
    } catch (execError: any) {
      const stderr = execError.stderr?.toLowerCase() || execError.message?.toLowerCase() || "";
      
      // Log the exact error to your terminal for debugging
      console.error("QPDF Execution Error:", stderr);

      if (stderr.includes("invalid password") || stderr.includes("password")) {
        return NextResponse.json(
          { 
            error: "USER_PASSWORD_REQUIRED", 
            message: "Incorrect password or strict encryption detected. Please try again." 
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: "PROCESS_FAILED", message: "Failed to process the PDF. Ensure qpdf is installed and the file is not corrupted." },
        { status: 400 }
      );
    }

    // Read the successfully unlocked PDF back into a buffer
    const unlockedBuffer = await readFile(outputPath);

    // Return the clean buffer to the client UI
    return new NextResponse(unlockedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error) {
    console.error("PDF Unlock API Error:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "An unexpected server error occurred." },
      { status: 500 }
    );
  } finally {
    // ALWAYS clean up temporary files to prevent disk space leaks
    if (inputPath && existsSync(inputPath)) await unlink(inputPath).catch(() => {});
    if (outputPath && existsSync(outputPath)) await unlink(outputPath).catch(() => {});
  }
}