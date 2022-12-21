import { mod } from "matija-utils";
import { parseLines } from "../utils/index.js";

const equal = (a, b) => {
  if (a === null || b === null) return false;
  return a.n === b.n && a.r.n === b.r.n && a.l.n === b.l.n;
};

const nodes = parseLines("./20 - Grove Positioning System/input.txt", true).map(
  (n) => ({ l: null, n: +n, r: null })
);

const nodes2 = JSON.parse(JSON.stringify(nodes)).map((n) => {
  n.n *= 811589153;
  return n;
});

for (let i = 0; i < nodes.length; i++) {
  nodes[i].r = nodes[mod(i + 1, nodes.length)];
  nodes[i].l = nodes[mod(i - 1, nodes.length)];
  nodes2[i].r = nodes2[mod(i + 1, nodes2.length)];
  nodes2[i].l = nodes2[mod(i - 1, nodes2.length)];
}

const parseNodes = (nodes, acc, iteratee) => {
  for (const k of nodes) {
    if (k.n === 0) {
      acc = k;
      continue;
    }
    iteratee = k;
    if (k.n > 0) {
      for (let i = 0; i < mod(k.n, nodes.length - 1); i++)
        iteratee = iteratee.r;
      if (equal(k, iteratee)) continue;
      k.r.l = k.l;
      k.l.r = k.r;
      iteratee.r.l = k;
      k.r = iteratee.r;
      iteratee.r = k;
      k.l = iteratee;
    } else {
      for (let i = 0; i < mod(-k.n, nodes.length - 1); i++)
        iteratee = iteratee.l;
      if (equal(k, iteratee)) continue;
      k.l.r = k.r;
      k.r.l = k.l;
      iteratee.l.r = k;
      k.l = iteratee.l;
      iteratee.l = k;
      k.r = iteratee;
    }
  }
  return { accNew: acc, iterateeNew: iteratee };
};

// Part 1
let ctr = 0;
let acc = null;
let iteratee = null;

const { accNew } = parseNodes(nodes, acc, iteratee);
acc = accNew;

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 1000; j++) acc = acc.r;
  ctr += acc.n;
}

console.log(ctr);

// Part 2
ctr = 0;
acc = null;
iteratee = null;

for (let i = 0; i < 10; i++) {
  const { accNew, iterateeNew } = parseNodes(nodes2, acc, iteratee);
  acc = accNew;
  iteratee = iterateeNew;
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 1000; j++) acc = acc.r;
  ctr += acc.n;
}

console.log(ctr);
