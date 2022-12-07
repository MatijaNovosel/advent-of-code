import { parseLines } from "../utils/index.js";

const lines = parseLines("../07 - No Space Left On Device/input.txt", true)
  .join(";")
  .split("$ ");

// Constructing the file system by building a tree of sorts
const fs = {
  "/": {}
};

const stack = [fs["/"]];

for (let i = 2; i < lines.length; i++) {
  if (lines[i].includes("cd ")) {
    const [, next] = lines[i].replace(";", "").split(" ");
    if (next === "..") stack.shift();
    else stack.unshift(stack[0][next]);
  } else {
    const contents = lines[i]
      .slice(3, lines[i].length)
      .split(";")
      .filter((x) => x !== "");
    contents.forEach((c) => {
      if (c.includes("dir")) {
        const [, dir] = c.split(" ");
        stack[0][dir] = {};
      } else {
        const [size, name] = c.split(" ");
        stack[0][name] = +size;
      }
    });
  }
}

// Part 1
const maxSize = 100_000;
let dirSum = 0;

const iterateSum = (obj) => {
  let res = 0;
  Object.values(obj).forEach((val) => {
    if (typeof val === "object") res += iterateSum(val);
    else res += val;
  });
  return res;
};

const iterate = (obj) => {
  Object.values(obj).forEach((val) => {
    if (typeof val === "object") {
      const size = iterateSum(val);
      if (size < maxSize) dirSum += size;
      iterate(val);
    }
  });
};

iterate(fs["/"]);

console.log(dirSum);
