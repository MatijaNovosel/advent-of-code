import { parseLines } from "../utils/index.js";

const lines = parseLines("./08 - Treetop Tree House/input.txt", true);
let biggestScenicScore = 0;
let innerTrees = 0;
const edgeTrees = lines.length * 2 + (lines.length - 2) * 2;

const discover = (x, y) => {
  const val = lines[x][y];
  let visibility = 0b1111;
  let t = 0;
  let r = 0;
  let b = 0;
  let l = 0;

  for (let i = x - 1; i >= 0; i--, t++)
    if (lines[i][y] >= val) {
      visibility = visibility & 0b0111;
      break;
    }

  for (let i = y + 1; i < lines[x].length; i++, r++)
    if (lines[x][i] >= val) {
      visibility = visibility & 0b1011;
      break;
    }

  for (let i = x + 1; i < lines.length; i++, b++)
    if (lines[i][y] >= val) {
      visibility = visibility & 0b1101;
      break;
    }

  for (let i = y - 1; i >= 0; i--, l++)
    if (lines[x][i] >= val) {
      visibility = visibility & 0b1110;
      break;
    }

  return {
    score: ++t * r * b * l,
    visible: (visibility ^ 0b1111) !== 0b1111
  };
};

for (let x = 1; x < lines.length - 1; x++)
  for (let y = 1; y < lines[x].length - 1; y++) {
    const { visible, score } = discover(x, y);
    if (score > biggestScenicScore) biggestScenicScore = score;
    innerTrees += visible;
  }

// Part 1
console.log(innerTrees + edgeTrees);

// Part 2
console.log(biggestScenicScore);
