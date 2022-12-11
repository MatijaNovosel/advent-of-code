import { chunk, repeat } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = chunk(
  parseLines("../11 - Monkey in the Middle/input.txt", true).filter(
    (l) => l !== ""
  ),
  6
).map((l) => l.slice(1, l.length));

const monkeys = [];

lines.forEach((l) => {
  monkeys.push({
    items: l[0]
      .slice(l[0].indexOf(": ") + 1, l[0].length)
      .split(", ")
      .map((n) => +n),
    operation: Function(
      "old",
      `return ${l[1].slice(l[1].indexOf("= ") + 2, l[1].length)}`
    ),
    test: Function("n", `return n % ${parseInt(l[2].replace(/[^0-9]/g, ""))}`),
    throwToTrue: parseInt(l[3].replace(/[^0-9]/g, "")),
    throwToFalse: parseInt(l[4].replace(/[^0-9]/g, "")),
    inspections: 0
  });
});

repeat(20, () =>
  monkeys.forEach((m) => {
    m.items.forEach((item) => {
      const worryLevel = Math.floor(m.operation(item) / 3);
      if (m.test(worryLevel) === 0)
        monkeys[m.throwToTrue].items.push(worryLevel);
      else monkeys[m.throwToFalse].items.push(worryLevel);
      m.items = m.items.filter((i) => i !== item);
      m.inspections++;
    });
  })
);

// Part 1
monkeys.sort((a, b) => b.inspections - a.inspections);
console.log(monkeys[0].inspections * monkeys[1].inspections);
