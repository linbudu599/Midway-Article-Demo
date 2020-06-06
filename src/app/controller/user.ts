import { Context, controller, get, inject, provide, post } from "midway";
import { IUserService } from "../../interface";
import { responseGener } from "../../util";

@provide()
@controller("/user")
export class UserController {
  @inject()
  ctx: Context;

  @inject("userService")
  service: IUserService;

  @get("/all")
  async getUser(): Promise<void> {
    const res = await this.service.getAllUsers();
    this.ctx.body = responseGener(res, "Fetch User Info Successfully");
  }

  @post("/create")
  async createUser(): Promise<void> {
    const { body } = this.ctx.request;
    const res = await this.service.createUser({ ...body });
    this.ctx.body = responseGener(res, "Create User Successfully");
  }

  @get("/uid/:uid")
  async findUserByUid(): Promise<void> {
    const {
      params: { uid },
    } = this.ctx;
    console.log(this.ctx.params);
    const res = await this.service.findUserByUid(uid);
    this.ctx.body = responseGener(res, "Find User By UID Successfully");
  }
}
