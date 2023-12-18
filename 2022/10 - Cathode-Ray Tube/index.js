import { chunk } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2022/10 - Cathode-Ray Tube/input.txt", true);

let cycle = 0;
let position = 1;
const history = [];

const sumOfCycleValues = (...args) =>
  args.reduce((acc, n) => {
    const { cycle, position } = history.find((h) => h.cycle === n);
    acc += cycle * position;
    return acc;
  }, 0);

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

// Part 2
for (const c of chunk(history, 40)) {
  let line = "";
  let lineIdx = 0;
  for (let i = 0; i < 40; i++, lineIdx++) {
    const { _, position } = c[i];
    line += [position - 1, position, position + 1].includes(lineIdx)
      ? "🟧"
      : "⬛";
  }
  console.log(line);
}
