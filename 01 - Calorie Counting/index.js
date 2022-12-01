import fs from "fs";
import { splitByValue, sum } from "../utils/index.js";

const fileContents = fs.readFileSync("input.txt");

const lines = fileContents
  .toString()
  .split("\n")
  .map((x) => x.trim());

const grouped = splitByValue(lines, "");
const elfCalories = grouped
  .map((g) => sum(...g.map((x) => +x)))
  .sort((a, b) => b - a);

// Part 1 - Max calories of an individual elf
console.log(elfCalories[0]);

// Part 2 - Sum of top 3 calorie counts
console.log(elfCalories[0] + elfCalories[1] + elfCalories[2]);
