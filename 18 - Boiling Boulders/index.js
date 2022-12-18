import { count } from "matija-utils";
import { parseLines } from "../utils/index.js";

const coordinates = parseLines("../18 - Boiling Boulders/input.txt", true).map(
  (l) => l.split(",").map(Number)
);

const offset = [
  { x: 0, y: 0, z: 0.5 },
  { x: 0, y: 0, z: -0.5 },
  { x: 0.5, y: 0, z: 0 },
  { x: -0.5, y: 0, z: 0 },
  { x: 0, y: 0.5, z: 0 },
  { x: 0, y: -0.5, z: 0 }
];

const sides = {};

coordinates.forEach((c) => {
  const [x, y, z] = c;
  offset.forEach((o) => {
    const { x: ox, y: oy, z: oz } = o;
    const k = JSON.stringify([x + ox, y + oy, z + oz]);
    if (!sides[k]) sides[k] = 0;
    sides[k]++;
  });
});

console.log(count(Object.values(sides), (e) => e === 1));
