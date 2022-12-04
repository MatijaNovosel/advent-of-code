import { intersect, parseLines, range } from "../utils/index.js";

const lines = parseLines("../04 - Camp Cleanup/input.txt");

const ranges = lines.map((l) => {
  const [firstHalf, secondHalf] = l.split(",");
  const [firstStart, firstEnd] = firstHalf.split("-");
  const [secondStart, secondEnd] = secondHalf.split("-");

  const firstRange = range(+firstStart, +firstEnd);
  const secondRange = range(+secondStart, +secondEnd);

  return [firstRange, secondRange];
});

// Part 1
let count = 0;

ranges.forEach(([r1, r2]) => {
  const result = intersect(r1, r2);

  if (
    result.toString() === r1.toString() ||
    result.toString() === r2.toString()
  ) {
    count++;
  }
});

console.log(count);

// Part 2
count = 0;

ranges.forEach(([r1, r2]) => {
  if (intersect(r1, r2).length > 0) {
    count++;
  }
});

console.log(count);
