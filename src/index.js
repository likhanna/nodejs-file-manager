const args = process.argv.slice(2);

const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg
  ? usernameArg.split("=")[1]
  : process.env.npm_config_username;

console.log(`Welcome to the File Manager, ${username}!`);

process.stdin.on("data", (data) => {
  const input = data.toString().trim();

  // Если пользователь ввел '.exit', завершаем приложение
  if (input === ".exit") {
    exitApp();
  }
});

process.on("SIGINT", () => {
  exitApp();
});

function exitApp() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}
