import { chunk } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("../10 - Cathode-Ray Tube/input.txt", true);

let cycle = 0;
let position = 1;
const history = [];

const sumOfCycleValues = (...args) => {
  let sum = 0;
  args.forEach((n) => {
    const { cycle, position } = history.filter((h) => h.cycle === n)[0];
    sum += cycle * position;
  });
  return sum;
};

const updateHistory = ({ cycle, position }) => {
  if (!history.some((h) => h.cycle === cycle))
    history.push({ cycle, position });
};

lines.forEach((l) => {
  if (l.startsWith("addx ")) {
    const amount = +l.split(" ")[1];
    updateHistory({ cycle, position });
    cycle++;
    updateHistory({ cycle, position });
    cycle++;
    updateHistory({ cycle, position });
    position += amount;
  } else {
    cycle++;
  }
  updateHistory({ cycle, position });
});

// Part 1
console.log(sumOfCycleValues(20, 60, 100, 140, 180, 220));

const chunked = chunk(history, 40);

console.log(chunked);
