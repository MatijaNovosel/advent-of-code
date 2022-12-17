import { range } from "matija-utils";
import { parseLines } from "../utils/index.js";

const lines = parseLines("../16 - Proboscidea Volcanium/input.txt", true);

const valves = {};
const tunnels = {};

lines.forEach((l) => {
  let [valve, flow, , , , targets] = l
    .match(
      /^Valve (.*) has flow rate=(.*); (tunnel|tunnels) (lead|leads) to (valve|valves) (.*)$/
    )
    .slice(1, 7);
  flow = +flow;
  targets = targets.split(", ");
  valves[valve] = flow;
  tunnels[valve] = targets;
});

const dists = {};
const full = [];
const startingValve = "AA";

for (const valve of Object.keys(valves)) {
  const start = valve === startingValve;
  if (!start && !valves[valve]) continue;
  if (!start) full.push(valve);
  dists[valve] = {
    AA: 0
  };
  const known = new Set([valve]);
  const stack = [[0, valve]];
  while (stack.length) {
    const [d, pos] = stack.shift();
    for (const neighbor of tunnels[pos]) {
      if (known.has(neighbor)) continue;
      known.add(neighbor);
      if (valves[neighbor]) dists[valve][neighbor] = d + 1;
      stack.push([d + 1, neighbor]);
    }
  }
  if (!start) delete dists[valve][startingValve];
}

const indices = full.reduce((acc, e, i) => {
  acc[e] = i;
  return acc;
}, {});

const storage = {};

const depthFirst = (t, v, b) => {
  const key = JSON.stringify([t, v, b]);
  if (storage[key]) return storage[key];
  let max = 0;
  for (const adjacent of Object.keys(dists[v])) {
    if (b & (1 << indices[adjacent])) continue;
    const rt = t - dists[v][adjacent] - 1;
    if (rt <= 0) continue;
    max = Math.max(
      max,
      depthFirst(rt, adjacent, b | (1 << indices[adjacent])) +
        valves[adjacent] * rt
    );
  }
  storage[key] = max;
  return max;
};

// Part 1
console.log(depthFirst(30, startingValve, 0));

// Part 2
const shift = (1 << full.length) - 1;
console.log(
  range(0, Math.floor((shift + 1) / 2)).reduce(
    (acc, n) =>
      (acc = Math.max(
        acc,
        depthFirst(26, startingValve, n) +
          depthFirst(26, startingValve, shift ^ n)
      )),
    0
  )
);
