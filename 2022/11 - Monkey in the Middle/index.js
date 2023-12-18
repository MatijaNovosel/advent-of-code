import { chunk } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = chunk(
  parseLines("./2022/11 - Monkey in the Middle/input.txt", true).filter(
    (l) => l !== ""
  ),
  6
).map((l) => l.slice(1, l.length));

const monkeys = [];
const initialItems = [];

lines.forEach((l) => {
  const mod = parseInt(l[2].replace(/[^0-9]/g, ""));
  const items = l[0]
    .slice(l[0].indexOf(": ") + 1, l[0].length)
    .split(", ")
    .map((n) => +n);
  initialItems.push([...items]);
  monkeys.push({
    items,
    operation: Function(
      "old",
      `return ${l[1].slice(l[1].indexOf("= ") + 2, l[1].length)}`
    ),
    mod,
    throwTo: Function(
      "n",
      `return n % ${mod} ? ${parseInt(
        l[4].replace(/[^0-9]/g, "")
      )} : ${parseInt(l[3].replace(/[^0-9]/g, ""))}`
    ),
    inspections: 0
  });
});

const superModulo = monkeys.reduce((acc, { mod }) => acc * mod, 1);

const monkeyBusiness = (monkeys, rounds, divisor) => {
  while (rounds--) {
    monkeys.forEach((m) => {
      m.inspections += m.items.length;
      m.items
        .map((item) => Math.trunc(m.operation(item) / divisor) % superModulo)
        .forEach((level) => monkeys[m.throwTo(level)].items.push(level));
      m.items = [];
    });
  }
  const inspections = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
};

// Part 1
console.log(monkeyBusiness(monkeys, 20, 3));

for (let i = 0; i < monkeys.length; i++) {
  monkeys[i].items = initialItems[i];
  monkeys[i].inspections = 0;
}

// Part 2
console.log(monkeyBusiness(monkeys, 10000, 1));
