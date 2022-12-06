import { allUnique, parseLines } from "../utils/index.js";

const input = parseLines("../06 - Tuning Trouble/input.txt", true)[0];

// Part 1

const stack = [];

for (let i = 0; i < input.length; i++) {
  stack.push(input[i]);
  if (stack.length === 4) {
    if (allUnique(...stack)) {
      console.log(i + 1);
      break;
    }
    stack.shift();
  }
}

// Part 2
