import chalk from "chalk";

export const log = (message: string, color?: string): void => {
  let printColor = color || "green";
  console.log(chalk[printColor](message));
};

export const responseGener = (data: any, message: string, success = true) => {
  return {
    success,
    message,
    data,
  };
};
