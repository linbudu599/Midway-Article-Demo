import { provide } from "midway";
import { Connection, getConnection, InsertResult, DeleteResult } from "typeorm";
import { Game } from "../entity";
import { mockGameData } from "../util";
import { IGameService, IGame } from "../interface";

@provide("gameService")
export class GameService implements IGameService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }
  async getAllGames(): Promise<IGame[]> {
    const result = await this.connection.manager.find(Game);
    return result;
  }
  getGameByGid(gdi: string): Promise<IGame> {
    throw new Error("Method not implemented.");
  }
  likeGame(gid: string): Promise<InsertResult> {
    throw new Error("Method not implemented.");
  }
  dislikeGame(gid: string): Promise<InsertResult> {
    throw new Error("Method not implemented.");
  }
}
