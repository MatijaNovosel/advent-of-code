import { parseLines } from "../utils/index.js";

const lines = parseLines("../05 - Supply Stacks/input.txt");

// Creating the stacks

const instructionsIdx = lines.findIndex((x) => x.includes("move"));
const boxLines = lines.slice(0, instructionsIdx - 2);
const instructionLines = lines.slice(instructionsIdx, lines.length);

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

const stacks1 = [...stacks];

// Part 1
instructionLines.forEach((l) => {
  const [numberToMove, origin, destination] = l
    .split(" ")
    .filter((x) => !isNaN(parseFloat(x)));

  for (let i = 0; i < numberToMove; i++) {
    stacks1[destination - 1].unshift(stacks1[origin - 1].shift());
  }
});

const top = stacks1.map((stack) => stack[0]).join("");

console.log(top);

// Part 2
const stacks2 = [...stacks];
