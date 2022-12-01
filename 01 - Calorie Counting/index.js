import fs from "fs";

const fileContents = fs.readFileSync("input.txt");
const lines = fileContents
  .toString()
  .split("\n")
  .map((x) => x.trim());

let accumulator = 0;
const calories = [];

lines.forEach((l, i) => {
  if (i === lines.length - 1 && accumulator.length === 0) {
    accumulator += +lines[i];
    calories.push(accumulator);
    return;
  }
  if (l.length === 0) {
    calories.push(accumulator);
    accumulator = 0;
    return;
  }
  accumulator += +lines[i];
});

calories.sort((a, b) => b - a);

// Part 1 - Max calories of an individual elf
console.log(calories[0]);

// Part 2 - Sum of top 3 calorie counts
console.log(calories[0] + calories[1] + calories[2]);
