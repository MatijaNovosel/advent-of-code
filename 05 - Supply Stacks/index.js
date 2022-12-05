import { parseLines } from "../utils/index.js";

const lines = parseLines("../05 - Supply Stacks/input.txt");

// Parsing the text and creating the stacks

const instructionsIdx = lines.findIndex((x) => x.includes("move"));
const boxLines = lines.slice(0, instructionsIdx - 2);
const instructionLines = lines
  .slice(instructionsIdx, lines.length)
  .map((l) => l.split(" ").filter((x) => !isNaN(parseFloat(x))));

const stacks = [];
const boxLineLength = boxLines[0].length;
let ctr = 0;

boxLines.forEach((l) => {
  for (let i = 1; i < boxLineLength; i += 4) {
    if (!stacks[ctr]) stacks.push([]);
    if (l[i] !== " ") stacks[ctr].push(l[i]);
    ctr++;
  }
  ctr = 0;
});

// Part 1
const stacks1 = JSON.parse(JSON.stringify(stacks));

instructionLines.forEach((l) => {
  const [numberToMove, origin, destination] = l;
  for (let i = 0; i < numberToMove; i++) {
    stacks1[destination - 1].unshift(stacks1[origin - 1].shift());
  }
});

console.log(stacks1.map((stack) => stack[0]).join(""));

// Part 2
const stacks2 = JSON.parse(JSON.stringify(stacks));

instructionLines.forEach((l) => {
  const [numberToMove, origin, destination] = l;
  const toMove = [];
  for (let i = 0; i < numberToMove; i++) {
    toMove.push(stacks2[origin - 1].shift());
  }
  toMove.reverse().forEach((x) => stacks2[destination - 1].unshift(x));
});

console.log(stacks2.map((stack) => stack[0]).join(""));
