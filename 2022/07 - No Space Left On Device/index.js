import { parseLines } from "../../utils/index.js";

const lines = parseLines("./2022/07 - No Space Left On Device/input.txt", true)
  .join(";")
  .split("$ ");

const iterateSum = (obj) => {
  let res = 0;
  Object.values(obj).forEach((val) => {
    if (typeof val === "object") res += iterateSum(val);
    else res += val;
  });
  return res;
};

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

const totalSize = iterateSum(fs["/"]);
let dirSum = 0;
let dirToDeleteSize = totalSize;

const iterate = (obj) => {
  Object.values(obj).forEach((val) => {
    if (typeof val === "object") {
      const size = iterateSum(val);
      if (size < 100_000) dirSum += size;
      if (
        70_000_000 - totalSize + size >= 30_000_000 &&
        size <= dirToDeleteSize
      )
        dirToDeleteSize = size;
      iterate(val);
    }
  });
};

iterate(fs["/"]);

// Part 1
console.log(dirSum);

// Part 2
console.log(dirToDeleteSize);
