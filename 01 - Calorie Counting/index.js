import fs from "fs";

const fileContents = fs.readFileSync("input.txt");
const lines = fileContents
  .toString()
  .split("\n")
  .map((x) => x.trim());

let accumulator = 0;
const elfCalories = [];

lines.forEach((l, i) => {
  if (i === lines.length - 1) {
    accumulator += +lines[i];
    elfCalories.push(accumulator);
    return;
  }

  if (l.length === 0) {
    elfCalories.push(accumulator);
    accumulator = 0;
    return;
  }

  accumulator += +lines[i];
});

elfCalories.sort((a, b) => b - a);

// Part 1 - Max calories of an individual elf
console.log(elfCalories[0]);

// Part 2 - Sum of top 3 calorie counts
console.log(elfCalories[0] + elfCalories[1] + elfCalories[2]);
