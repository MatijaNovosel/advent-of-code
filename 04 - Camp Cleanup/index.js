import { intersect, range } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("./04 - Camp Cleanup/input.txt", true);

const intersections = lines.map((l) => {
  const numbers = l.split(",").flatMap((x) => x.split("-").map((x) => +x));
  const r1 = range(numbers[0], numbers[1]);
  const r2 = range(numbers[2], numbers[3]);
  return { r1, r2, intersection: intersect(r1, r2) };
});

// Part 1
let count = intersections.reduce((acc, { r1, r2, intersection }) => {
  if (
    intersection.toString() === r1.toString() ||
    intersection.toString() === r2.toString()
  )
    acc++;
  return acc;
}, 0);

console.log(count);

// Part 2
count = intersections.reduce(
  (acc, { intersection }) => (acc += !!intersection.length),
  0
);

console.log(count);
