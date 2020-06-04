// import { InsertResult, DeleteResult } from "typeorm";
// import { User } from "./entity/user";

export interface IUTMock {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

export interface IUserService {
  // getUser(): Promise<IUser[]>;
  getUser(): Promise<IUser[] | null>;
  // insertUser(): Promise<InsertResult>;
  // searchUser(conditions: searchConditions): Promise<User[]>;
  // deleteUser(uid: number): Promise<DeleteResult>;
  // findByUid(uid: number): Promise<User>;
  // uTMockService(id: number): Promise<IUTMock>;
}
export type searchConditions = Partial<IUser>;

export interface IUser {
  uid?: number;
  name: string;
  description?: string;
  age: number;
  job?: string;
  isMarried?: boolean;
}
