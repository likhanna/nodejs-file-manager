import { createInterface } from "node:readline/promises";

function greeting(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
}

function goodbye(username) {
  console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
}

function getUsername() {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));
  return usernameArg
    ? usernameArg.split("=")[1]
    : process.env.npm_config_username;
}

export function startSession() {
  const username = getUsername();

  greeting(username);
  process.on("exit", () => goodbye(username));

  return createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });
}
