import { InsertResult, DeleteResult } from "typeorm";

export interface IUserService {
  getAllUsers(): Promise<IUser[] | null>;
  createUser(user: IUser): Promise<InsertResult>;
  // FIXME: remove unknown
  findUserByUid(uid: string): Promise<unknown>;
  deleteUser(uid: string): Promise<DeleteResult>;
  fillMockUser(): Promise<InsertResult>;
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
