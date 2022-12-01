import fs from "fs";
import { sum } from "../utils/index.js";

const fileContents = fs.readFileSync("input.txt");
const lines = fileContents.toString().split("\n");

let accumulator = [];
const chunked = [];

lines.forEach((l, i) => {
  if (i === lines.length - 1 && accumulator.length === 0) {
    accumulator.push(parseInt(l));
    chunked.push(accumulator);
    return;
  }
  if (l.length === 0) {
    chunked.push(accumulator);
    accumulator = [];
    return;
  }
  accumulator.push(parseInt(l));
});

const sortedChunked = chunked.sort((a, b) => sum(b) - sum(a));

// Part 1 - Max calories of an individual elf
console.log(sum(sortedChunked[0]));

// Part 2 - Sum of top 3 calorie counts
console.log(
  sum([...sortedChunked[0], ...sortedChunked[1], ...sortedChunked[2]])
);
