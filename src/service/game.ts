import { provide, inject } from "midway";
import { InsertResult, Connection } from "typeorm";
import { Game, Flow } from "../entity";
import { log } from "../util";
import { IGameService, IGame } from "../interface";

@provide("gameService")
export class GameService implements IGameService {
  @inject("connection")
  connection: Connection;

  async getAllGames(): Promise<IGame[]> {
    const result = await this.connection.manager.find(Game);
    return result;
  }
  async getGameByGid(gid: string): Promise<IGame> {
    const result = await this.connection.manager.findOne(Game, gid);
    return result;
  }
  async likeGame(gid: string, uid: string): Promise<InsertResult> {
    // 在Flow表中插入一条记录 并使用事务 让Game表中对应的game点赞数+1
    const result = await this.connection.manager.insert(Flow, {
      uid,
      gid,
      isLike: true,
    });
    log("FavorCount Increment Transaction Invoked");
    this.connection.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.increment(Game, { gid }, "favorCount", 1);
    });
    return result;
  }
  async unlikeGame(gid: string, uid: string): Promise<InsertResult> {
    const result = await this.connection.manager.insert(Flow, {
      uid,
      gid,
      isLike: false,
    });
    log("FavorCount Decrement Transaction Invoked");
    this.connection.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.decrement(Game, { gid }, "favorCount", 1);
    });
    return result;
  }
}
