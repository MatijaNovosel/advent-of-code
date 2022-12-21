import { parseLines } from "../utils/index.js";

const lines = parseLines("./21 - Monkey Math/input.txt", true);

const monkeys = {};
let i = 0;

while (lines) {
  if (!lines[i]) break;
  const [name, expression] = lines[i].split(": ");
  if (isNaN(expression)) {
    const [left, operation, right] = expression.split(" ");
    if (monkeys[left] && monkeys[right])
      monkeys[name] = eval(`${monkeys[left]} ${operation} ${monkeys[right]}`);
    else lines.push(lines[i]);
  } else {
    monkeys[name] = +expression;
  }
  i++;
}

// Part 1
console.log(monkeys["root"]);
