import { spawnSync } from "child_process";
import { performance } from "node:perf_hooks";
import path from "path";

const prompt = process.argv.slice(2).join(" ") || "echo hello";
const cliPath = path.resolve(__dirname, "../codex-cli/bin/codex.js");

function run(args: string[]): number {
  const start = performance.now();
  spawnSync("node", [cliPath, ...args], { stdio: "inherit" });
  return performance.now() - start;
}

console.log("Running baseline...");
const baseline = run(["-q", prompt]);
console.log(`Baseline execution took ${baseline.toFixed(0)} ms`);

console.log("Running with Tygent...");
const accelerated = run(["--tygent", "-q", prompt]);
console.log(`Tygent execution took ${accelerated.toFixed(0)} ms`);

