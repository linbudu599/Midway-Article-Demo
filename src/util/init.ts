import { IUser } from '../interface/user';

export const initialData = (length: number): IUser[] => {
  const arr = Array(length);
  const mockData = {
    name: 'linbudu',
    age: 21,
  };
  return arr.fill(mockData);
};
