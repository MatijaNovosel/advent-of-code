import fs from "fs";

export const sum = (...args) => {
  return args.reduce((a, b) => a + b);
};

export const splitByValue = (arr, val) => {
  const result = [[]];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      result.push([]);
    } else {
      result[result.length - 1].push(arr[i]);
    }
  }

  return result;
};

export const parseLines = (fileName) => {
  const fileContents = fs.readFileSync(fileName);

  return fileContents
    .toString()
    .split("\n")
    .map((x) => x.trim());
};
