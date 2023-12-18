import { exec } from "child_process";
import fs from "fs";
import { promisify } from "util";

const execAsync = promisify(exec);
const params = process.argv.slice(2);

if (params.length !== 2) throw new Error("Invalid number of arguments!");

const year = params[0];
const day = params[1];

if (+day < 1 || +day > 25) throw new Error("Invalid day!");

const folder = fs
  .readdirSync(`./${year}/`)
  .find((f) => f.startsWith(day.padStart(2, "0")));

if (folder)
  console.log((await execAsync(`node "./${year}/${folder}/index.js"`)).stdout);
else console.warn("That day hasn't been implemented!");
