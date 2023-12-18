import { generateArray } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const cave = parseLines("./2022/14 - Regolith Reservoir/input.txt", true).map(
  (l) => l.split(" -> ").map((n) => n.split(",").map((n) => +n))
);

const maxX = Math.max(...cave.flat().map(([x]) => x)) * 2;
const maxY = Math.max(...cave.flat().map(([_, y]) => y));

const simulateSand = (visualization, p2 = false) => {
  let x = 500;
  let y = 0;
  let next = false;
  while (true) {
    if (y > maxY + 1) {
      next = true;
      break;
    }
    if (visualization[y + 1][x] == 0) {
      y++;
      continue;
    }
    if (visualization[y + 1][x - 1] == 0) {
      y++;
      x--;
      continue;
    }
    if (visualization[y + 1][x + 1] == 0) {
      y++;
      x++;
      continue;
    }
    break;
  }
  visualization[y][x] = 2;
  return p2 ? y === 0 : next;
};

const parse = (visualization, from, to) => {
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const [minX, minY] = [Math.min(fromX, toX), Math.min(fromY, toY)];
  const [maxX, maxY] = [Math.max(fromX, toX), Math.max(fromY, toY)];
  for (let i = minX; i <= maxX; i++)
    for (let j = minY; j <= maxY; j++) visualization[j][i] = 1;
};

let visualization = generateArray(maxY + 3, generateArray(maxX, 0));
const v = JSON.parse(JSON.stringify(visualization));

// Part 1
let part1 = 0;

cave.forEach((c) => {
  c.forEach((p, i) => {
    if (i !== 0) parse(visualization, c[i - 1], p);
  });
});

while (!simulateSand(visualization)) part1++;
console.log(part1);

// Part 2
let part2 = 0;
visualization = v;

[
  ...cave,
  [
    [0, maxY + 2],
    [maxX * 2, maxY + 2]
  ]
].forEach((c) =>
  c.forEach((p, i) => {
    if (i !== 0) parse(visualization, c[i - 1], p);
  })
);

while (!simulateSand(visualization, true)) part2++;
console.log(part2 + 1);
