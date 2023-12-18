import { generateArray } from "matija-utils";
import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2022/09 - Rope Bridge/input.txt", true).map((l) =>
  l.split(" ")
);

const knots = generateArray(10, { x: 0, y: 0 });
const history = generateArray(10, ["0-0"]);

const move = () => {
  for (let i = 1; i < knots.length; i++) {
    const { x, y } = knots[i - 1];
    const { x: knotX, y: knotY } = knots[i];
    const offset = Math.abs(x - knotX) + Math.abs(y - knotY);
    if (x === knotX || y === knotY) {
      if (offset < 2) return;
      if (x > knotX) knots[i].x++;
      else if (x < knotX) knots[i].x--;
      else if (y > knotY) knots[i].y++;
      else knots[i].y--;
    } else {
      if (offset < 3) return;
      if (x > knotX && y > knotY) {
        knots[i].x++;
        knots[i].y++;
      } else if (x < knotX && y < knotY) {
        knots[i].x--;
        knots[i].y--;
      } else if (x > knotX && y < knotY) {
        knots[i].x++;
        knots[i].y--;
      } else {
        knots[i].x--;
        knots[i].y++;
      }
    }
  }
};

lines.forEach((l) => {
  let [dir, n] = l;
  for (let i = 0; i < +n; i++) {
    switch (dir) {
      case "U":
        knots[0].y--;
        break;
      case "R":
        knots[0].x++;
        break;
      case "D":
        knots[0].y++;
        break;
      case "L":
        knots[0].x--;
        break;
    }
    move();
    knots.forEach((knot, i) => history[i].push(`${knot.x}-${knot.y}`));
  }
});

// Part 1
console.log(new Set(history[1]).size);

// Part 2
console.log(new Set(history[9]).size);
