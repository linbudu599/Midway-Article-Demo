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
    const res = this.service.createUser({ ...body });
    this.ctx.body = responseGener(res, "Create User Successfully");
  }
}
