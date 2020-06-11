import { Context, controller, get, inject, provide, post, del } from 'midway';
import { IGameService } from '../../interface';
import { responseGener } from '../../util';

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
    this.ctx.body = responseGener(res, 'Fetch User Info Successfully');
  }
}
