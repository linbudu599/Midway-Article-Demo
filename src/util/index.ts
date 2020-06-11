import chalk from 'chalk';

export const log = (message: string, color?: string): void => {
  const printColor = color || 'green';
  console.log(chalk[printColor](message));
};

export const responseGener = (data: any, message: string, success = true) => {
  return {
    success,
    message,
    data,
  };
};

export * from './init';
