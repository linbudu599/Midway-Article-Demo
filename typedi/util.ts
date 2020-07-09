import chalk from "chalk";

export const log = (message: any, color: string = "green"): void => {
  console.log((chalk as any)[color](message));
};
