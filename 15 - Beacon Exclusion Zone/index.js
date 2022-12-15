import { difference, end, range } from "matija-utils";
import { parseLines } from "../utils/index.js";

const coordinates = parseLines(
  "../15 - Beacon Exclusion Zone/input.txt",
  true
).map((l) => {
  return l
    .match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/
    )
    .slice(1, 5)
    .map(Number);
});

const calc = (offset = 2_000_000) => {
  const intervals = [];
  const visited = new Set();
  for (const [sx, sy, bx, by] of coordinates) {
    const diff = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - offset);
    if (diff < 0) continue;
    intervals.push({ x: sx - diff, y: sx + diff });
    if (by === offset) visited.add(bx);
  }
  intervals.sort();
  const arr = [];
  for (const { x, y } of intervals) {
    if (!arr.length) {
      arr.push({ x, y });
      continue;
    }
    const { y: endY } = end(arr, 1);
    if (x > endY + 1) {
      arr.push({ x, y });
      continue;
    }
    end(arr, 1).y = Math.max(endY, y);
  }
  return { intervals, visited, arr };
};

// Part 1
const { intervals, visited } = calc();
const forbidden = new Set();
for (const { x, y } of intervals) range(x, y).forEach((n) => forbidden.add(n));
console.log(difference(forbidden, visited).length);

// Part 2
let found = false;
const max = 4_000_000;

for (const n of range(0, max)) {
  if (found) break;
  const { arr } = calc(n);
  let res = 0;
  for (const { x, y } of arr) {
    if (res < x) {
      console.log(res * max + n);
      found = true;
      break;
    }
    res = Math.max(res, y + 1);
    if (res > max) break;
  }
}
