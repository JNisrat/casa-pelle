#!/usr/bin/env node
import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
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
  console.error(`\n[build:clean] Port ${port} is in use.`);
  console.error("[build:clean] Stop the dev server before cleaning .next.\n");
  console.error(`      lsof -ti:${port} | xargs kill -9\n`);
  process.exit(1);
}

if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

const child = spawn("npx", ["next", "build"], {
  cwd: root,
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});

