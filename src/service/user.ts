import { provide } from "midway";
// , IUserOptions, IUserResult
import { IUserService } from "../interface";

@provide("userService")
export class UserService implements IUserService {
  async getUser(): Promise<any> {
    return {
      id: 1,
      username: "mockedName",
      phone: "12345678901",
      email: "xxx.xxx@xxx.com",
    };
  }
}
