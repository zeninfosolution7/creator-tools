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
  let qpdfExecutable = "qpdf"; // Defaults to system qpdf on Windows

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (!file) {
      return NextResponse.json({ error: "BAD_REQUEST", message: "No PDF provided." }, { status: 400 });
    }

    // 1. Write the uploaded PDF to Vercel's temporary directory
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(inputPath, Buffer.from(arrayBuffer));

    // 2. VERCEL LINUX BYPASS: Inject the binary if on Vercel
    if (process.platform === "linux") {
      const qpdfSourcePath = path.join(process.cwd(), "bin", "qpdf-linux");
      
      if (!existsSync(qpdfSourcePath)) {
        throw new Error("CRITICAL: Linux QPDF binary not found at " + qpdfSourcePath);
      }

      // Copy to /tmp and grant execute permissions
      tempExecutablePath = path.join(tmpDir, `qpdf-exec-${uniqueId}`);
      await fs.copyFile(qpdfSourcePath, tempExecutablePath);
      await fs.chmod(tempExecutablePath, 0o777); 
      
      qpdfExecutable = tempExecutablePath; 
    }

    // 3. Prepare Native Decryption Arguments
    const args = ["--decrypt"];
    if (password) {
      args.push(`--password=${password}`);
    }
    args.push(inputPath, outputPath);

    // 4. EXECUTE WITH STRICT EXIT CODE CHECKING
    try {
      await execFileAsync(qpdfExecutable, args);
    } catch (error: any) {
      // QPDF returns Exit Code 2 when the password is mathematically incorrect.
      if (error.code === 2) {
        return NextResponse.json(
          { error: "USER_PASSWORD_REQUIRED", message: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }
      
      // QPDF returns Exit Code 3 if it succeeded but had warnings. We ignore 3 and proceed.
      // If it is anything else, Vercel crashed the binary. Expose the raw output.
      if (error.code !== 0 && error.code !== 3) {
        return NextResponse.json(
          { 
            error: "QPDF_CRASH", 
            message: `Linux Exit Code: ${error.code}. OS Output: ${error.stderr || error.message}` 
          },
          { status: 500 }
        );
      }
    }

    // 5. The file is guaranteed 100% decrypted. Read it into memory.
    const unlockedBuffer = await fs.readFile(outputPath);

    // 6. Return pure, unlocked binary back to the client
    return new NextResponse(unlockedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error: any) {
    // 7. DIAGNOSTIC CATCH: Expose the raw system error to the frontend if Node.js crashes
    console.error("Native Decryption API Error:", error);
    return NextResponse.json(
      { 
        error: "SERVER_ERROR", 
        message: `System Error: ${error.message}`,
        details: error.stack 
      },
      { status: 500 }
    );
  } finally {
    // 8. Prune temporary files to protect Vercel memory limits
    if (existsSync(inputPath)) await fs.unlink(inputPath).catch(() => {});
    if (existsSync(outputPath)) await fs.unlink(outputPath).catch(() => {});
    if (tempExecutablePath && existsSync(tempExecutablePath)) {
      await fs.unlink(tempExecutablePath).catch(() => {});
    }
  }
}