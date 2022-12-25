import { parseLines } from "../utils/index.js";

const lines = parseLines("./25 - Full of Hot Air/input.txt", true);

let acc = 0;

lines.forEach((l) => {
  let inc = 1;
  l.split("")
    .reverse()
    .forEach((c) => {
      acc += ("=-012".indexOf(c) - 2) * inc;
      inc *= 5;
    });
});

let res = "";

while (acc) {
  const r = acc % 5;
  acc = Math.floor(acc / 5);
  if (r <= 2) {
    res = r + res;
  } else {
    res = "   =-"[r] + res;
    acc++;
  }
}

console.log(res);
