import { common, count } from "matija-utils";
import { parseLines } from "../utils/index.js";

const coordinates = parseLines("./18 - Boiling Boulders/input.txt", true).map(
  (l) => l.split(",").map(Number)
);

const between = (a, b, c) => a <= b && b <= c;
const bounds = 99999;

const offset = [
  { x: 0, y: 0, z: 0.5 },
  { x: 0, y: 0, z: -0.5 },
  { x: 0.5, y: 0, z: 0 },
  { x: -0.5, y: 0, z: 0 },
  { x: 0, y: 0.5, z: 0 },
  { x: 0, y: -0.5, z: 0 }
];

let minimumX = bounds;
let minimumY = bounds;
let minimumZ = bounds;

let maximumX = -bounds;
let maximumZ = -bounds;
let maximumY = -bounds;

const sides = {};
const lava = new Set();

coordinates.forEach((c) => {
  const [x, y, z] = c;
  lava.add(JSON.stringify([x, y, z]));
  minimumX = Math.min(minimumX, x);
  minimumY = Math.min(minimumY, y);
  minimumZ = Math.min(minimumZ, z);
  maximumX = Math.max(maximumX, x);
  maximumY = Math.max(maximumY, y);
  maximumZ = Math.max(maximumZ, z);
  offset.forEach((o) => {
    const { x: ox, y: oy, z: oz } = o;
    const point = JSON.stringify([x + ox, y + oy, z + oz]);
    if (!sides[point]) sides[point] = 0;
    sides[point]++;
  });
});

// Part 1
console.log(count(Object.values(sides), (e) => e === 1));

const stack = [{ x: minimumX, y: minimumY, z: minimumZ }];
const emptySpace = new Set();
emptySpace.add(JSON.stringify([minimumX, minimumY, minimumZ]));

while (stack.length) {
  const { x, y, z } = stack.shift();
  for (const { x: ox, y: oy, z: oz } of offset) {
    const bx = x + ox * 2;
    const by = y + oy * 2;
    const bz = z + oz * 2;
    const point = JSON.stringify([bx, by, bz]);
    if (
      !(
        between(minimumX - 1, bx, maximumX + 1) &&
        between(minimumY - 1, by, maximumY + 1) &&
        between(minimumZ - 1, bz, maximumZ + 1)
      )
    )
      continue;
    if (lava.has(point) || emptySpace.has(point)) continue;
    emptySpace.add(point);
    stack.push({ x: bx, y: by, z: bz });
  }
}

const freeSpace = new Set();

emptySpace.forEach((e) => {
  const [x, y, z] = JSON.parse(e);
  offset.forEach((o) => {
    const { x: dx, y: dy, z: dz } = o;
    freeSpace.add(JSON.stringify([x + dx, y + dy, z + dz]));
  });
});

// Part 2
console.log(common(Object.keys(sides), [...freeSpace]).length);
