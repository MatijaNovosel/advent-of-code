import { chunk } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("../03 - Rucksack Reorganization/input.txt", true).map(
  (items) => items.split("")
);

const values = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((prev, curr, i) => ({ ...prev, [curr]: i + 1 }), {});

// Part 1
let itemPrioritySum = 0;

lines.forEach((items) => {
  const half = items.length / 2;
  const firstHalf = items.slice(0, half);
  const secondHalf = items.slice(half, items.length);
  itemPrioritySum += values[firstHalf.find((val) => secondHalf.includes(val))];
});

console.log(itemPrioritySum);

// Part 2
itemPrioritySum = 0;
const chunked = chunk(lines, 3);

chunked.forEach((items) => {
  const [a, b, c] = items;
  itemPrioritySum +=
    values[a.find((val) => b.includes(val) && c.includes(val))];
});

console.log(itemPrioritySum);
