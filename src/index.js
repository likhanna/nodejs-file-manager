import { homedir } from "node:os";
import { validateCmd, handleCmd } from "./commands/index.js";
import { parseInput } from "./utils/index.js";
import { startSession } from "./utils/user.js";

let currentDir = homedir();
const session = startSession();

session.prompt();
session.on("line", async (line) => {
  const [cmd, ...args] = parseInput(line);

  if (validateCmd(cmd, args)) {
    try {
      const res = await handleCmd(cmd, currentDir, args);

      if (res) {
        currentDir = res;
      }

      console.log("Opeartion successful!");
    } catch (error) {
      console.log(error);
      console.log("Operation failed");
    }
  } else {
    console.log("Invalid input");
  }
  console.log(`You are currently in ${currentDir}\n`);
  session.prompt();
});
