import { parseLines, sum } from "../utils/index.js";

const lines = parseLines("../02 - Rock Paper Scissors/input.txt").map((x) =>
  x.replace(" ", "")
);

// Hardcoding works, but definitely not the best or ideal solution
let outcomes = {
  AZ: 3,
  AX: 4,
  AY: 8,
  BZ: 9,
  BX: 1,
  BY: 5,
  CZ: 6,
  CX: 7,
  CY: 2
};

// Part 1
let res = sum(...lines.map((x) => outcomes[x]));
console.log(res);

// Part 2
outcomes = { ...outcomes, AZ: 8, AX: 3, AY: 4, CZ: 7, CX: 2, CY: 6 };

res = sum(...lines.map((x) => outcomes[x]));
console.log(res);
