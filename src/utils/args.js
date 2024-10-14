export function parseInput(input) {
  let args = input.split(" ");
  const quoteRegExp = /"|'/g;

  if (quoteRegExp.test(args)) {
    const quotesRegExp = /["'] | ["']/;
    args = args
      .join(" ")
      .split(quotesRegExp)
      .map((arg) => arg.replace(quoteRegExp, ""));
  }

  return args;
}
