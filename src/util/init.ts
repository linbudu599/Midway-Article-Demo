import { IUser } from "../interface";

export const initialData = (length: number): IUser[] => {
  const arr = Array(length);
  const mockData = {
    name: "linbudu",
    age: 21,
  };
  console.log(arr.fill(mockData));
  return arr.fill(mockData);
};
