import { provide } from 'midway';
import { Connection, getConnection, InsertResult, DeleteResult } from 'typeorm';
import { User, Flow, Game } from '../entity';
import { mockUserData, log } from '../util';
import { IUserService, IUser, IGame } from '../interface';

@provide('userService')
export class UserService implements IUserService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }

  async getAllUsers(): Promise<IUser[] | null> {
    log('=== getAllUsers Service Invoked ===');
    const result = await this.connection.manager.find(User);
    return result;
  }

  async createUser(user: IUser): Promise<InsertResult> {
    log('=== createUser Service Invoked ===');
    const result = await this.connection.manager.insert(User, { ...user });
    return result;
  }

  async findUserByUid(uid: string): Promise<unknown> {
    log('=== findUserByUid Service Invoked ===');
    const result = await this.connection.manager.findOne(User, uid);
    return result;
  }

  async deleteUser(uid: string): Promise<DeleteResult> {
    log('=== deleteUser Service Invoked ===');
    const result = await this.connection.manager.delete(User, uid);
    return result;
  }

  async fillMockUser(): Promise<InsertResult> {
    log('=== fillMockUser Service Invoked ===');
    const result = await this.connection.manager.insert(User, mockUserData(5));
    return result;
  }

  async userLikedGames(uid: string): Promise<IGame[]> {
    log('=== userLikedGames Service Invoked ===');
    const result = await this.connection.manager.find(Flow, { uid });
    console.log(result);
    const gids = [];
    result.forEach((item) => {
      gids.push(item.gid);
    });
    console.log(gids);
    const games = await this.connection.manager.findByIds(Game, gids);
    return games;
  }
}
