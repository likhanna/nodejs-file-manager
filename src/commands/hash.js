const { createHash } = await import("node:crypto");
import { createReadStream } from "node:fs";

export async function hash(path) {
  const hash = createHash("sha256");
  const readable = createReadStream(path);
  readable.pipe(hash);

  await new Promise((resolve, reject) => {
    readable.on("end", () => resolve());
    readable.on("error", (e) => reject(e));
  });

  console.log(`Hash of ${path} is: ${hash.digest("hex")}`);
}
