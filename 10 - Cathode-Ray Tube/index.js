import { parseLines } from "../utils/index.js";

const lines = parseLines("../10 - Cathode-Ray Tube/input.txt", true);

let cycle = 0;
let total = 1;
const history = [];

const sumOfCycleValues = (...args) => {
  let sum = 0;
  args.forEach((n) => {
    const { cycle, total } = history.filter((h) => h.cycle === n)[0];
    sum += cycle * total;
  });
  return sum;
};

lines.forEach((l) => {
  if (l.startsWith("addx ")) {
    const amount = +l.split(" ")[1];
    history.push({ cycle, total });
    cycle++;
    history.push({ cycle, total });
    cycle++;
    history.push({ cycle, total });
    total += amount;
    history.push({ cycle, total });
  } else {
    cycle++;
    history.push({ cycle, total });
  }
});

// Part 1
console.log(sumOfCycleValues(20, 60, 100, 140, 180, 220));
