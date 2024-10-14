import { access, stat } from "node:fs/promises";
import { dirname } from "node:path";

async function isExist(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function checkExist(path) {
  try {
    return await stat(path);
  } catch {
    throw new Error("File or folder doesn't exist");
  }
}

export async function checkNotExist(path) {
  const isFileExist = await isExist(path);

  if (isFileExist) {
    throw new Error("File is already exists");
  }
}

export function isPathToFile(filename) {
  const dirMarkerRegExp = /\/|\\/g;
  return !dirMarkerRegExp.test(filename);
}

export async function checkIsNotFile(path) {
  const pathStat = await checkExist(path);
  const isFile = pathStat.isFile();

  if (isFile) {
    throw new Error("Is File");
  }
}

export function getDirFromPath(filePath) {
  return dirname(filePath);
}
