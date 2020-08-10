import { Context, controller, get, inject, provide, post } from 'midway';
import { IGameService } from '../../interface';
import { responseGener, log } from '../../util';

@provide()
@controller('/games')
export class GameController {
  @inject()
  ctx: Context;

  @inject('gameService')
  service: IGameService;

  @get('/all')
  async getAllGames(): Promise<void> {
    const res = await this.service.getAllGames();
    this.ctx.body = responseGener(res, 'Fetch Game Info Successfully');
  }

  @get('/gid/:gid')
  async getGameById(): Promise<void> {
    const {
      params: { gid },
    } = this.ctx;
    const res = await this.service.getGameByGid(gid);
    this.ctx.body = responseGener(res, 'Find Game By GID Successfully');
  }

  @post('/like')
  async likeGame(): Promise<void> {
    const { gid, uid } = await this.ctx.request.body;
    console.log(gid, uid);
    const res = await this.service.likeGame(gid, uid);
    // FIXME: 应当查询gid/uid是否存在
    this.ctx.body = responseGener(res, 'Like Game Successfully');
  }

  @post('/unlike')
  async unlikeGame(): Promise<void> {
    const { gid, uid } = await this.ctx.request.body;
    const res = await this.service.unlikeGame(gid, uid);
    // FIXME: 应当查询gid/uid是否存在
    this.ctx.body = responseGener(res, 'Like Game Successfully');
  }
}
