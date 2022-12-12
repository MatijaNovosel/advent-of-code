import { parseLines } from "../utils/index.js";

const lines = parseLines("./12 - Hill Climbing Algorithm/input.txt", true);

const terrain = [];

for (let i = 0; i < lines.length; i++)
  for (let j = 0; j < lines[i].length; j++)
    terrain.push(lines[i][j].charCodeAt(0));

const start = terrain.findIndex((i) => i === "S".charCodeAt(0));
const end = terrain.findIndex((i) => i === "E".charCodeAt(0));

terrain[start] = "a".charCodeAt(0);
terrain[end] = "z".charCodeAt(0);

const bfs = (start) => {
  let queue = [[start, 0]];
  const cache = new Set([start]);
  while (queue.length) {
    const [pos, steps] = queue.shift();
    if (pos === end) return steps;
    const res = [
      lines[0].length + pos,
      -lines[0].length + pos,
      1 + pos,
      -1 + pos
    ].filter((r) => terrain[r] <= terrain[pos] + 1 && !cache.has(r));
    res.forEach((r) => cache.add(r));
    queue = [...queue, ...res.map((c) => [c, steps + 1])];
  }
  return Infinity;
};

// Part 1
console.log(bfs(start));

// Part 2
console.log(
  terrain
    .map((c, i) => ({ c, start: i }))
    .filter(({ c }) => c === "a".charCodeAt(0))
    .map(({ start }) => bfs(start))
    .reduce((min, v) => (min < v ? min : v))
);
