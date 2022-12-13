import { product, splitByValue } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("./13 - Distress Signal/input.txt", true);

const grouped = splitByValue(lines, "").map(([a, b]) => [
  JSON.parse(a),
  JSON.parse(b)
]);

const compare = (left, right) => {
  let ctr = 0;
  while (ctr < left.length && ctr < right.length) {
    if (typeof left[ctr] === "number" && typeof right[ctr] === "number") {
      if (left[ctr] != right[ctr]) return left[ctr] - right[ctr];
    } else {
      const c = compare([left[ctr]].flat(), [right[ctr]].flat());
      if (c != 0) return c;
    }
    ctr++;
  }
  return left.length - right.length;
};

// Part 1
console.log(
  grouped.reduce((acc, [a, b], i) => {
    if (compare(a, b) < 0) acc += i + 1;
    return acc;
  }, 0)
);

const dividers = [[[2]], [[6]]];
const base = [...grouped.flat(1), ...dividers];
base.sort(compare);
console.log(product(...dividers.map((pkg) => base.indexOf(pkg) + 1)));
