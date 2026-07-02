#!/usr/bin/env node
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const devDir = path.join(root, ".next-dev");
const port = process.env.PORT || "3000";

function isPortInUse(targetPort) {
  try {
    execSync(`lsof -ti:${targetPort}`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

if (isPortInUse(port)) {
  console.error(`\n[dev] Port ${port} is already in use.`);
  console.error(`[dev] Stop the existing server first:\n`);
  console.error(`      lsof -ti:${port} | xargs kill -9\n`);
  console.error(`[dev] Or use another port:\n`);
  console.error(`      PORT=3001 npm run dev\n`);
  process.exit(1);
}

if (process.env.FORCE_CLEAN === "1" && fs.existsSync(devDir)) {
  console.log("[dev] FORCE_CLEAN=1 — removing .next-dev");
  fs.rmSync(devDir, { recursive: true, force: true });
}

const child = spawn("npx", ["next", "dev"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    NEXT_DIST_DIR: ".next-dev",
  },
});

child.on("exit", (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
