import { readdir } from "node:fs/promises";

import { checkIsNotFile } from "../utils/index.js";

export async function cd(path) {
  await checkIsNotFile(path);
  return path;
}

export async function ls(path) {
  const dirList = await readdir(path, { withFileTypes: true });
  const sortedDirList = dirList
    .sort((a, b) => a.isFile() - b.isFile())
    .filter((item) => !item.isSymbolicLink());

  const result = sortedDirList.map((el) => ({
    Name: el.name,
    Type: el.isFile() ? "file" : "directory",
  }));

  console.table(result);
}
