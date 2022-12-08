import { exec } from "child_process";
import fs from "fs";
import { promisify } from "util";

const execAsync = promisify(exec);
const params = process.argv.slice(2);

if (params.length !== 1) throw new Error("Invalid number of arguments!");

const day = params[0];

if (+day < 1 || +day > 25) throw new Error("Invalid day!");

const folder = fs
  .readdirSync(".")
  .find((f) => f.startsWith(day.padStart(2, "0")));

if (folder)
  console.log((await execAsync(`node "./${folder}/index.js"`)).stdout);
else console.warn("That day hasn't been implemented!");
