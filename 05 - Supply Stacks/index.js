import { generateArray } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("./05 - Supply Stacks/input.txt");

// Parsing the text and creating the stacks
const instructionsIdx = lines.findIndex((x) => x.includes("move"));
const boxLines = lines.slice(0, instructionsIdx - 2);
const instructionLines = lines
  .slice(instructionsIdx, lines.length)
  .map((l) => l.split(" ").filter((x) => !isNaN(parseFloat(x))));

const boxLineLength = boxLines[0].length;
const stacks = generateArray((boxLineLength - 1 - 3) / 4 + 1, []);

boxLines.forEach((l) => {
  for (let i = 1; i < boxLineLength; i += 4)
    if (l[i] !== " ") stacks[(i - 1) / 4].push(l[i]);
});

// Part 1
const stacks1 = JSON.parse(JSON.stringify(stacks));

instructionLines.forEach((l) => {
  const [numberToMove, origin, destination] = l;
  for (let i = 0; i < numberToMove; i++)
    stacks1[destination - 1].unshift(stacks1[origin - 1].shift());
});

console.log(stacks1.map((stack) => stack[0]).join(""));

// Part 2
const stacks2 = JSON.parse(JSON.stringify(stacks));

instructionLines.forEach((l) => {
  const [numberToMove, origin, destination] = l;
  const toMove = [];
  for (let i = 0; i < numberToMove; i++)
    toMove.unshift(stacks2[origin - 1].shift());
  toMove.forEach((x) => stacks2[destination - 1].unshift(x));
});

console.log(stacks2.map((stack) => stack[0]).join(""));
