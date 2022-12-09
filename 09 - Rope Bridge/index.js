import { parseLines } from "../utils/index.js";

const lines = parseLines("../09 - Rope Bridge/test.txt", true).map((l) =>
  l.split(" ")
);

// Constructing the matrix
const matrix = [["s"]];
let x = 0;
let y = 0;
let width = 1;

const extendMatrix = (dir, n) => {
  console.log("extending: ", dir, n);

  switch (dir) {
    case "U":
      for (let j = 0; j < n; j++) {
        matrix.unshift(
          Array(width)
            .fill()
            .map(() => ".")
        );
      }
      break;
    case "R":
      width += n;
      for (let j = 0; j < matrix.length; j++) {
        matrix[j] = Array(width)
          .fill()
          .map(() => ".");
      }
      break;
    case "D":
      for (let j = 0; j < n; j++) {
        matrix.push(
          Array(width)
            .fill()
            .map(() => ".")
        );
      }
      break;
    case "L":
      width += n;
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[j].length < width) {
          Array(n).forEach(() => matrix[j].unshift("."));
        }
      }
      break;
  }
};

for (let i = 0; i < lines.length; i++) {
  matrix[x][y] = ".";
  let [dir, n] = lines[i];
  n = +n;

  console.log({ dir, n });

  switch (dir) {
    case "U":
      if (x - n < 0) extendMatrix(dir, Math.abs(x - n));
      x += Math.abs(x - n);
      break;
    case "R":
      if (y + n > width) extendMatrix(dir, Math.abs(y + n - width));
      break;
    case "D":
      if (x + n > matrix.length) extendMatrix(dir, Math.abs(x - n));
      break;
    case "L":
      if (y - n < 0) extendMatrix(dir, Math.abs(y + n - width));
      y += y + n - width;
      break;
  }

  matrix[x][y] = "H";
  console.log({ x, y });
  console.table(matrix);
}
