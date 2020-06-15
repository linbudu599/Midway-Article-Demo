import { Context, controller, get, inject, provide, post, del } from "midway";
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
    const res = await this.service.findUserByUid(uid);
    this.ctx.body = responseGener(res, "Find User By UID Successfully");
  }

  @del("/uid/:uid", { middleware: ["delMw"] })
  async deleteUser(): Promise<void> {
    const {
      params: { uid },
    } = this.ctx;
    const res = await this.service.deleteUser(uid);
    this.ctx.body = responseGener(res, "Delete User Successfully");
  }

  @get("/fillMockData")
  async fillMockData(): Promise<void> {
    const res = await this.service.fillMockUser();
    this.ctx.body = responseGener(res, "Fill Mock User Successfully");
  }

  @get("/like/:uid")
  async userLikedGames(): Promise<void> {
    const {
      params: { uid },
    } = this.ctx;
    const res = await this.service.userLikedGames(uid);
    this.ctx.body = responseGener(res, "Fetch User Liked Games Successfully");
  }
}
