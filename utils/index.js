import fs from "fs";

export const parseLines = (fileName, trim) => {
  const contents = fs.readFileSync(fileName).toString().split("\n");
  contents.pop();
  if (trim) return contents.map((x) => x.trim());
  return contents;
};

export const parseInput = (fileName) => {
  return fs.readFileSync(fileName).toString();
};
