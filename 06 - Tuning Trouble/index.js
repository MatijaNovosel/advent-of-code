import { parseLines } from "../utils/index.js";

const input = parseLines("../06 - Tuning Trouble/input.txt", true)[0];

const detectMarker = (n = 4) => {
  for (let i = 0; i < input.length; i++)
    if (new Set(input.substring(i, i + n)).size === n) {
      console.log(i + n);
      break;
    }
};

// Part 1
detectMarker();

// Part 2
detectMarker(14);
