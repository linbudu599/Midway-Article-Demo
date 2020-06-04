import { provide } from "midway";
import { Connection, getConnection } from "typeorm";
import { User } from "../entity/user";
import { IUserService, IUser } from "../interface";

@provide("userService")
export class UserService implements IUserService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }

  async getUser(): Promise<IUser[] | null> {
    console.log("===getUser Service Invoked===");
    const result = await this.connection.manager.find(User);
    return result;
  }
}
