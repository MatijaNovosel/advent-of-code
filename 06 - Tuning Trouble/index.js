import { allUnique, parseLines } from "../utils/index.js";

const input = parseLines("../06 - Tuning Trouble/input.txt", true)[0];

const detectMarker = (n = 4) => {
  const stack = [];
  for (let i = 0; i < input.length; i++) {
    stack.push(input[i]);
    if (stack.length === n) {
      if (allUnique(...stack)) {
        console.log(i + 1);
        break;
      }
      stack.shift();
    }
  }
};

// Part 1
detectMarker();

// Part 2
detectMarker(14);
