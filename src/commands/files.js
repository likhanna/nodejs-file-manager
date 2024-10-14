import { createReadStream, createWriteStream } from "node:fs";
import fs from "node:fs/promises";
import { pipeline } from "node:stream/promises";

import { checkExist, checkNotExist } from "../utils/index.js";

async function copyFile(src, dest) {
  await checkExist(src);
  await checkNotExist(dest);

  const readable = createReadStream(src);
  const writable = createWriteStream(dest);

  await pipeline(readable, writable);
}

async function removeFile(path) {
  await fs.rm(path);
}

export async function cat(path) {
  await checkExist(path);

  const readable = createReadStream(path, "utf-8");
  readable.pipe(process.stdout);

  await new Promise((resolve, reject) => {
    readable.on("end", () => resolve());
    readable.on("error", (e) => reject(e));
  });
}

export async function add(name) {
  await fs.writeFile(name, "", { flag: "wx" });
}

export async function rn(oldPath, newPath) {
  await checkNotExist(newPath);
  await fs.rename(oldPath, newPath);
}

export async function cp(src, dest) {
  await copyFile(src, dest);
}

export async function rm(path) {
  await removeFile(path);
}

export async function mv(src, dest) {
  await copyFile(src, dest);
  await removeFile(src);
}
