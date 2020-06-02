// import { InsertResult, DeleteResult } from "typeorm";
// import { User } from "./entity/user";

/**
 * @description User-Service response
 */
export interface IUTMock {
  id: number;
  username: string;
  phone: string;
  email?: string;
}

/**
 * @description User-Service abstractions
 */
export interface IUserService {
  // getUser(): Promise<IUser[]>;
  getUser(): Promise<any>;
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
