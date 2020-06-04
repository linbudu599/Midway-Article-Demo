import { Context, controller, get, inject, provide } from "midway";
import { IUserService } from "../../interface";
import { responseGener } from "../../util";

@provide()
@controller("/user")
export class UserController {
  @inject()
  ctx: Context;

  @inject("userService")
  service: IUserService;

  @get("/users")
  async getUser(): Promise<void> {
    const res = await this.service.getUser();
    this.ctx.body = responseGener(res, "Fetch User Info Successfully");
  }
}
