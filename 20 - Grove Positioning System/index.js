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

const len = nodes.length;

for (let i = 0; i < len; i++) {
  nodes[i].r = nodes[mod(i + 1, len)];
  nodes[i].l = nodes[mod(i - 1, len)];
  nodes2[i].r = nodes2[mod(i + 1, len)];
  nodes2[i].l = nodes2[mod(i - 1, len)];
}

const parseNodes = (nodes, acc, iteratee) => {
  for (const node of nodes) {
    if (node.n === 0) {
      acc = node;
      continue;
    }
    iteratee = node;
    if (node.n > 0) {
      for (let i = 0; i < mod(node.n, nodes.length - 1); i++)
        iteratee = iteratee.r;
      if (equal(node, iteratee)) continue;
      node.r.l = node.l;
      node.l.r = node.r;
      iteratee.r.l = node;
      node.r = iteratee.r;
      iteratee.r = node;
      node.l = iteratee;
    } else {
      for (let i = 0; i < mod(-node.n, nodes.length - 1); i++)
        iteratee = iteratee.l;
      if (equal(node, iteratee)) continue;
      node.l.r = node.r;
      node.r.l = node.l;
      iteratee.l.r = node;
      node.l = iteratee.l;
      iteratee.l = node;
      node.r = iteratee;
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
