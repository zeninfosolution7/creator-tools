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
  const tmpDir = os.tmpdir(); 
  
  const inputPath = path.join(tmpDir, `input-${uniqueId}.pdf`);
  const outputPath = path.join(tmpDir, `output-${uniqueId}.pdf`);
  
  let tempExecutablePath = "";
  let tempLibPath = "";
  let qpdfExecutable = "qpdf"; 

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const password = formData.get("password") as string | null;

    if (!file) {
      return NextResponse.json({ error: "BAD_REQUEST", message: "No PDF provided." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(inputPath, Buffer.from(arrayBuffer));

    // VERCEL LINUX BYPASS: Inject Engine AND Shared Library
    if (process.platform === "linux") {
      const qpdfSourcePath = path.join(process.cwd(), "bin", "qpdf-linux");
      const libSourcePath = path.join(process.cwd(), "bin", "libqpdf.so.30"); // The missing blueprint
      
      if (!existsSync(qpdfSourcePath)) {
        throw new Error("CRITICAL: Linux QPDF binary not found at " + qpdfSourcePath);
      }

      // 1. Copy the Engine to /tmp and grant execute permissions
      tempExecutablePath = path.join(tmpDir, `qpdf-exec-${uniqueId}`);
      await fs.copyFile(qpdfSourcePath, tempExecutablePath);
      await fs.chmod(tempExecutablePath, 0o777); 
      qpdfExecutable = tempExecutablePath; 

      // 2. Copy the Missing Blueprint to /tmp so the Engine can read it
      if (existsSync(libSourcePath)) {
        tempLibPath = path.join(tmpDir, "libqpdf.so.30");
        await fs.copyFile(libSourcePath, tempLibPath);
      } else {
        console.warn("WARNING: libqpdf.so.30 not found in bin folder. Execution may fail.");
      }
    }

    const args = ["--decrypt"];
    if (password) args.push(`--password=${password}`);
    args.push(inputPath, outputPath);

    try {
      // 3. EXECUTE WITH KERNEL OVERRIDES
      // We must explicitly tell Vercel's Linux kernel to look in /tmp for the missing .so file
      await execFileAsync(qpdfExecutable, args, {
        env: {
          ...process.env,
          // This line is the magic key that fixes Error 127
          LD_LIBRARY_PATH: `${tmpDir}:${process.env.LD_LIBRARY_PATH || ""}` 
        }
      });
    } catch (error: any) {
      if (error.code === 2) {
        return NextResponse.json(
          { error: "USER_PASSWORD_REQUIRED", message: "Incorrect password. Please try again." },
          { status: 401 }
        );
      }
      
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

    const unlockedBuffer = await fs.readFile(outputPath);

    return new NextResponse(unlockedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="unlocked_${file.name}"`,
      },
    });

  } catch (error: any) {
    console.error("Native Decryption API Error:", error);
    return NextResponse.json(
      { error: "SERVER_ERROR", message: `System Error: ${error.message}`, details: error.stack },
      { status: 500 }
    );
  } finally {
    // 4. Scrub the /tmp folder clean
    if (existsSync(inputPath)) await fs.unlink(inputPath).catch(() => {});
    if (existsSync(outputPath)) await fs.unlink(outputPath).catch(() => {});
    if (tempExecutablePath && existsSync(tempExecutablePath)) await fs.unlink(tempExecutablePath).catch(() => {});
    if (tempLibPath && existsSync(tempLibPath)) await fs.unlink(tempLibPath).catch(() => {});
  }
}