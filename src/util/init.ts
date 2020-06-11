import { IUser } from '../interface/user';
import { IGame } from '../interface/game';

export const mockUserData = (length: number): IUser[] => {
  const arr = Array(length);

  for (let i = 0; i < length; i++) {
    arr.push({
      name: `linbudu${Math.floor(Math.random() * 100)}`,
      age: Math.floor(Math.random() * 22),
    });
  }

  return arr;
};

export const mockGameData = (length: number): IGame[] => {
  const arr = Array(length);

  for (let i = 0; i < length; i++) {
    arr.push({
      name: 'Subnatica',
      saleYear: '2019',
      price: '99',
      favorCount: 0,
    });
  }

  return arr;
};
