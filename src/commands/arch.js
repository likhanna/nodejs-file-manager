import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

import { checkExist, checkNotExist } from "../utils/index.js";

const ACTIONS = {
  compress: "compress",
  decompress: "decompress",
};

async function createBrotli(src, dest, action) {
  await checkExist(src);
  await checkNotExist(dest);

  const brotli =
    action === ACTIONS.decompress
      ? createBrotliDecompress()
      : createBrotliCompress();
  const srcStream = createReadStream(src);
  const destStream = createWriteStream(dest);

  await pipeline(srcStream, brotli, destStream);
}

export async function compress(...args) {
  await createBrotli(...args, ACTIONS.compress);
}

export const decompress = async (...args) => {
  await createBrotli(...args, ACTIONS.decompress);
};
