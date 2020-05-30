import chalk from "chalk";

export const log = (message: string, color?: string): void => {
  let printColor = color || "green";
  console.log(chalk[printColor](message));
};
