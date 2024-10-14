import { resolve } from "node:path";

import * as files from "./files.js";
import * as nwd from "./nwd.js";
import * as arch from "./arch.js";
import { osInfo } from "./os-info.js";
import { hash } from "./hash.js";
import { isPathToFile, getDirFromPath } from "../utils/index.js";

const commands = {
  [".exit"]() {
    process.exit();
  },
  os({ length: l, [l - 1]: flag }) {
    osInfo(flag);
  },
  async up([current]) {
    return await nwd.cd(resolve(current, ".."));
  },
  async ls([current]) {
    await nwd.ls(current);
  },
  async cd([current, src]) {
    return await nwd.cd(resolve(current, src));
  },
  async cat([current, src]) {
    await files.cat(resolve(current, src));
  },
  async add([current, src]) {
    await files.add(resolve(current, src));
  },
  async rm([current, src]) {
    await files.rm(resolve(current, src));
  },
  async hash([current, src]) {
    await hash(resolve(current, src));
  },
  async rn([current, src, dest]) {
    const oldPath = resolve(current, src);
    const dir = getDirFromPath(oldPath);
    const newPath = resolve(dir, dest);

    await files.rn(oldPath, newPath);
  },
  async cp([current, src, dest]) {
    await files.cp(resolve(current, src), resolve(current, dest));
  },
  async mv([current, src, dest]) {
    await files.mv(resolve(current, src), resolve(current, dest));
  },
  async compress([current, src, dest]) {
    await arch.compress(resolve(current, src), resolve(current, dest));
  },
  async decompress([current, src, dest]) {
    await arch.decompress(resolve(current, src), resolve(current, dest));
  },
};

export function validateCmd(cmd, [src, dest]) {
  switch (cmd) {
    case "up":
    case "ls":
    case ".exit":
      return true;

    case "cd":
    case "cat":
    case "rm":
    case "os":
    case "hash":
    case "cat":
      if (src) {
        return true;
      }

    case "mv":
    case "cp":
    case "compress":
    case "decompress":
      if (src && dest) {
        return true;
      }

    case "add":
      if (src && isPathToFile(src)) {
        return true;
      }

    case "rn":
      if (src && dest && isPathToFile(dest)) {
        return true;
      }

    default:
      return false;
  }
}

export async function handleCmd(cmd, current, args) {
  return await commands[cmd]([current, ...args]);
}
