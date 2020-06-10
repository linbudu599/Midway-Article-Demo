import { provide } from "midway";
import { Connection, getConnection, InsertResult, DeleteResult } from "typeorm";
import { User } from "../entity/user";
import { mockGameData } from "../util/init";
import { IGameService, IGame } from "../interface/game";

@provide("gameService")
export class GameService implements IGameService {
  connection: Connection;

  constructor() {
    // @InjectRepository(User) private readonly userRepository: Repository<User>
    this.connection = getConnection();
  }
  getAllGames(): Promise<IGame[]> {
    throw new Error("Method not implemented.");
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
