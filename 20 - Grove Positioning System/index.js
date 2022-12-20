import { parseLines } from "../utils/index.js";

const numbers = parseLines(
  "../20 - Grove Positioning System/test.txt",
  true
).map(Number);

const move = (idx, moves, arr) => {
  const len = arr.length;
  let newIdx = idx;
  const toMove = Math.abs(moves) % len;
  if (moves > 0) {
    if (idx + toMove < len) newIdx = idx + toMove;
    else if (idx + toMove > len) newIdx = toMove - idx - 2;
  } else if (moves < 0) {
    if (idx - toMove > 0) newIdx = idx - toMove;
    else if (idx - toMove < 0) newIdx = len - toMove;
  }
  const [a, b] = [arr[newIdx], arr[idx]];
  arr[newIdx] = b;
  arr[idx] = a;
};

for (let i = 0; i < base.length; i++) {
  console.log({
    numbers,
    i,
    number: numbers[i]
  });
  move(i, numbers[i], numbers);
  console.log({ numbers });
}
