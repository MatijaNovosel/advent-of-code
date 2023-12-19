import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2023/02 - Cube Conundrum/input.txt", true);

const POSSIBLE_GAMES_RED = 12;
const POSSIBLE_GAMES_GREEN = 13;
const POSSIBLE_GAMES_BLUE = 14;
let res1 = 0;
let res2 = 0;

for (const line of lines) {
  let isPossible = true;
  const [game, colorsLine] = line.split(": ");
  const gameId = parseInt(game.split(" ")[1]);
  const largestCount = {
    red: 0,
    green: 0,
    blue: 0
  };
  for (const partition of colorsLine.split("; ")) {
    const count = {
      red: 0,
      green: 0,
      blue: 0
    };
    for (const color of partition.split(", ")) {
      const [value, name] = color.split(" ");
      count[name] += parseInt(value);
      largestCount[name] =
        largestCount[name] > value ? largestCount[name] : parseInt(value);
    }
    const possible =
      count.red <= POSSIBLE_GAMES_RED &&
      count.blue <= POSSIBLE_GAMES_BLUE &&
      count.green <= POSSIBLE_GAMES_GREEN;
    isPossible = isPossible && possible;
  }
  res2 += largestCount.red * largestCount.blue * largestCount.green;
  if (isPossible) res1 += gameId;
}

// Part 1
console.log(res1);

// Part 2
console.log(res2);
