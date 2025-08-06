import { spawnSync } from "child_process";
import { performance } from "node:perf_hooks";
import path from "path";

const cliPath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../codex-cli/bin/codex.js",
);

function run(args) {
  const start = performance.now();
  spawnSync("node", [cliPath, ...args], { stdio: "inherit" });
  return performance.now() - start;
}

const tasks = [
  {
    name: "hello",
    prompt: "Create a JavaScript file that prints 'hello'.",
  },
  {
    name: "fizzbuzz",
    prompt: "Implement FizzBuzz in TypeScript.",
  },
  {
    name: "quicksort",
    prompt: "Write a TypeScript function that performs quicksort on an array.",
  },
];

for (const task of tasks) {
  console.log(`\nTask: ${task.name}`);
  console.log("Running baseline...");
  const baseline = run(["-q", task.prompt]);
  console.log(`Baseline execution took ${baseline.toFixed(0)} ms`);

  console.log("Running with Tygent...");
  const accelerated = run(["--tygent", "-q", task.prompt]);
  console.log(`Tygent execution took ${accelerated.toFixed(0)} ms`);
}

