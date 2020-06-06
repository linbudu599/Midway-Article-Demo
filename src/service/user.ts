import { provide } from 'midway';
import { Connection, getConnection, InsertResult, DeleteResult } from 'typeorm';
import { User } from '../entity/user';
import { initialData } from '../util/init';
import { IUserService, IUser } from '../interface';

@provide('userService')
export class UserService implements IUserService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }

  async getAllUsers(): Promise<IUser[] | null> {
    console.log('=== getAllUsers Service Invoked ===');
    const result = await this.connection.manager.find(User);
    return result;
  }

  async createUser(user: IUser): Promise<InsertResult> {
    console.log('=== createUser Service Invoked ===');
    const result = await this.connection.manager.insert(User, { ...user });
    return result;
  }

  async findUserByUid(uid: string): Promise<unknown> {
    console.log('=== findUserByUid Service Invoked ===');
    const result = await this.connection.manager.findOne(User, uid);
    return result;
  }

  async deleteUser(uid: string): Promise<DeleteResult> {
    console.log('=== deleteUser Service Invoked ===');
    const result = await this.connection.manager.delete(User, uid);
    return result;
  }

  async fillMockUser(): Promise<InsertResult> {
    console.log('=== fillMockUser Service Invoked ===');
    const result = await this.connection.manager.insert(User, initialData(5));
    return result;
  }
}
