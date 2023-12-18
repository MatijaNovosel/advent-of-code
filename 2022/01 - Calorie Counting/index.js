import { splitByValue, sum } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2022/01 - Calorie Counting/input.txt", true);
const grouped = splitByValue(lines, "");
const elfCalories = grouped
  .map((g) => sum(...g.map((x) => +x)))
  .sort((a, b) => b - a);

// Part 1 - Max calories of an individual elf
console.log(elfCalories[0]);

// Part 2 - Sum of top 3 calorie counts
console.log(elfCalories[0] + elfCalories[1] + elfCalories[2]);
