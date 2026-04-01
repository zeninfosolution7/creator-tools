import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const tmpDir = os.tmpdir(); // Safe on both Windows and Vercel
  
  const inputPath = path.join(tmpDir, `input-${uniqueId}.pdf`);
  const outputPath = path.join(tmpDir, `output-${uniqueId}.pdf`);
  
  let tempExecutablePath = "";
  // Default to system 'qpdf' (This makes it work on your local Windows setup automatically)
  let qpdfExecutable = "qpdf"; 

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (!file) {
      return NextResponse.json({ error: "BAD_REQUEST", message: "No PDF provided." }, { status: 400 });
    }

    // 1. Write the uploaded PDF to the temporary directory
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(inputPath, Buffer.from(arrayBuffer));

    // 2. THE VERCEL BYPASS: If running on Linux (Vercel), use our injected binary
    if (process.platform === "linux") {
      const qpdfSourcePath = path.join(process.cwd(), "bin", "qpdf-linux");
      
      if (!existsSync(qpdfSourcePath)) {
        throw new Error("CRITICAL: Linux QPDF binary not found at " + qpdfSourcePath);
      }

      // We must copy the binary to /tmp and grant it execute permissions to satisfy Linux security
      tempExecutablePath = path.join(tmpDir, `qpdf-exec-${uniqueId}`);
      await fs.copyFile(qpdfSourcePath, tempExecutablePath);
      await fs.chmod(tempExecutablePath, 0o777); // Give execution rights
      
      // Tell the script to use our smuggled executable
      qpdfExecutable = tempExecutablePath; 
    }

    // 3. Execute true Native Decryption
    const args = ["--decrypt"];
    if (password) args.push(`--password=${password}`);
    args.push(inputPath, outputPath);

    try {
      await execFileAsync(qpdfExecutable, args);
    } catch (execError: any) {
      const stderr = execError.stderr?.toLowerCase() || "";
      
      // Catch strict AES User Passwords
      if (stderr.includes("invalid password") || stderr.includes("password")) {
        return NextResponse.json(
          { error: "USER_PASSWORD_REQUIRED", message: "Strict encryption detected or incorrect password." },
          { status: 401 }
        );
      }
      throw new Error("Engine failed to process the PDF.");
    }

    // 4. The file is now guaranteed 100% unlocked. Read it back.
    const unlockedBuffer = await fs.readFile(outputPath);

    // 5. Return pure binary back to the client
    return new NextResponse(unlockedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error) {
    console.error("Native Decryption API Error:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "An unexpected error occurred." },
      { status: 500 }
    );
  } finally {
    // 6. Supercomputer cleanup: Destroy all temporary traces to keep memory pristine
    if (existsSync(inputPath)) await fs.unlink(inputPath).catch(() => {});
    if (existsSync(outputPath)) await fs.unlink(outputPath).catch(() => {});
    if (tempExecutablePath && existsSync(tempExecutablePath)) {
      await fs.unlink(tempExecutablePath).catch(() => {});
    }
  }
}