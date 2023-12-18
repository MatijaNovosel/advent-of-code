import { sum } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2023/01 - Trebuchet/input.txt", true);

const res1 = [];
const res2 = [];

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

const iterateDigits = (line) => {
  const results = [];
  let match = null;
  for (const digit of Object.keys(digits)) {
    const iterator = line.matchAll(digit);
    for (const i of iterator) {
      results.push({
        digit: digits[i[0]],
        location: i.index
      });
    }
  }
  const re = /[0-9]/gi;
  while ((match = re.exec(line)) != null) {
    results.push({
      digit: match[0],
      location: match.index
    });
  }
  results.sort((a, b) => a.location - b.location);
  return results;
};

const parseLine = (line) => {
  let stripped = line.replace(/[a-z]/gi, "");
  if (stripped.length === 1) stripped += stripped;
  else stripped = stripped[0] + stripped[stripped.length - 1];
  const res = parseInt(stripped);
  return res || 0;
};

for (const line of lines) {
  const results = iterateDigits(line);
  let finalDigits = [];
  for (const res of results) finalDigits.push(res.digit);
  // Part 1
  res1.push(parseLine(line));
  // Part 2
  res2.push(
    parseFloat("" + finalDigits[0] + finalDigits[finalDigits.length - 1])
  );
}

// Part 1
console.log(sum(...res1));

// Part 2
console.log(sum(...res2));
