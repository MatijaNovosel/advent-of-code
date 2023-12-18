import { mod } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2022/02 - Rock Paper Scissors/input.txt", true).map(
  (x) => x.split(" ")
);

// Part 1
console.log(
  lines.reduce((acc, l) => {
    let [p, e] = l;
    p = p.charCodeAt() - "A".charCodeAt() + 1;
    e = e.charCodeAt() - "X".charCodeAt() + 1;
    if (p === e) acc += 3;
    else if (mod(e - p, 3) === 1) acc += 6;
    acc += e;
    return acc;
  }, 0)
);

// Part 2
console.log(
  lines.reduce((acc, l) => {
    let [p, outcome] = l;
    p = p.charCodeAt() - "A".charCodeAt();
    if (outcome === "X") acc += mod(p - 1, 3) + 1;
    else if (outcome === "Y") acc += 3 + p + 1;
    else acc += 6 + mod(p + 1, 3) + 1;
    return acc;
  }, 0)
);
