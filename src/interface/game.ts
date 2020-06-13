import { InsertResult } from "typeorm";

export interface IGame {
  gid: string;
  name: string;
  saleYear: string;
  favorCount?: number;
  price: string;
  rate?: number;
  release: boolean;
}

export interface IGameService {
  getAllGames(): Promise<IGame[] | null>;
  getGameByGid(gdi: string): Promise<IGame>;
  likeGame(gid: string, uid: string): Promise<InsertResult>;
  unlikeGame(gid: string, uid: string): Promise<InsertResult>;
}
