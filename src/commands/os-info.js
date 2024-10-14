import os from "node:os";

export function osInfo(param) {
  switch (param) {
    case "--eol":
    case "--EOL":
      console.log(os.EOL);
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case "--cpus":
      const cpus = os.cpus();
      const result = cpus.map((cpu) => ({
        Model: cpu.model.trim(),
        Rate: `${cpu.speed / 1000} Ghz`,
      }));

      console.log(`Overall amount of CPUS: ${cpus.lengths}`);
      console.table(result);
      break;
    case "--homedir":
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case "--username":
      console.log(`System user name: ${os.userInfo().username}`);
      break;
    case "--architecture":
      console.log(`This processor architecture is: ${process.arch}`);
      break;
    default:
      console.log("Invalid input");
      break;
  }
}
