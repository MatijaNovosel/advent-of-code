import { parseLines } from "../utils/index.js";

const lines = parseLines("../08 - Treetop Tree House/test.txt", true);

const matrix = [...lines.map((l) => l.split("").map((n) => +n))];

// Part 1
let innerTrees = 0;
const edgeTrees = matrix.length * 2 + (matrix.length - 2) * 2;

const visible = (x, y, direction) => {
  const val = matrix[x][y];
  let isVisible = true;

  switch (direction) {
    case "t":
      for (let i = x - 1; i >= 0; i--)
        if (matrix[i][y] >= val) {
          isVisible = false;
          break;
        }
      break;
    case "r":
      for (let i = y + 1; i < matrix[x].length; i++)
        if (matrix[x][i] >= val) {
          isVisible = false;
          break;
        }
      break;
    case "b":
      for (let i = x + 1; i < matrix.length; i++)
        if (matrix[i][y] >= val) {
          isVisible = false;
          break;
        }
      break;
    case "l":
      for (let i = 0; i < y; i++)
        if (matrix[x][i] >= val) {
          isVisible = false;
          break;
        }
      break;
  }

  return isVisible;
};

for (let x = 1; x < matrix.length - 1; x++) {
  for (let y = 1; y < matrix[x].length - 1; y++) {
    const t = visible(x, y, "t");
    const r = visible(x, y, "r");
    const b = visible(x, y, "b");
    const l = visible(x, y, "l");
    innerTrees += !!(t || r || b || l);
  }
}

console.log(innerTrees + edgeTrees);

// Part 2
