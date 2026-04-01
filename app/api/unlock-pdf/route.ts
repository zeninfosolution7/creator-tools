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
  let tempLibs: string[] = []; // Array to track all dynamically loaded libraries
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

    // VERCEL LINUX BYPASS: The Omni-Loader
    if (process.platform === "linux") {
      const binDir = path.join(process.cwd(), "bin");
      const qpdfSourcePath = path.join(binDir, "qpdf-linux");
      
      if (!existsSync(qpdfSourcePath)) {
        throw new Error("CRITICAL: Linux QPDF binary not found at " + qpdfSourcePath);
      }

      // 1. Copy the Engine
      tempExecutablePath = path.join(tmpDir, `qpdf-exec-${uniqueId}`);
      await fs.copyFile(qpdfSourcePath, tempExecutablePath);
      await fs.chmod(tempExecutablePath, 0o777); 
      qpdfExecutable = tempExecutablePath; 

      // 2. Dynamically load EVERY library file in the bin folder to /tmp
      const binFiles = await fs.readdir(binDir);
      for (const file of binFiles) {
        // Skip the engine itself, we only want the dependencies
        if (file !== "qpdf-linux" && !file.startsWith("qpdf-exec")) {
          const sourceLibPath = path.join(binDir, file);
          const destLibPath = path.join(tmpDir, file); // Keep exact same filename
          await fs.copyFile(sourceLibPath, destLibPath);
          tempLibs.push(destLibPath); // Add to tracking array for cleanup
        }
      }
    }

    const args = ["--decrypt"];
    if (password) args.push(`--password=${password}`);
    args.push(inputPath, outputPath);

    try {
      // 3. EXECUTE WITH OMNI-LINKED KERNEL
      await execFileAsync(qpdfExecutable, args, {
        env: {
          ...process.env,
          // Tell Vercel's kernel to look in /tmp for ALL the libraries we just copied
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
    // 4. Scrub the /tmp folder clean to prevent memory leaks
    if (existsSync(inputPath)) await fs.unlink(inputPath).catch(() => {});
    if (existsSync(outputPath)) await fs.unlink(outputPath).catch(() => {});
    if (tempExecutablePath && existsSync(tempExecutablePath)) await fs.unlink(tempExecutablePath).catch(() => {});
    
    // Dynamically delete every library we copied
    for (const libPath of tempLibs) {
      if (existsSync(libPath)) await fs.unlink(libPath).catch(() => {});
    }
  }
}