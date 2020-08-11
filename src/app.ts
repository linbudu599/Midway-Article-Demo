import "reflect-metadata";
import { createConnection, getConnection, Connection } from "typeorm";
import { Application } from "midway";
import { User, Game, Flow } from "./entity";
import { mockUserData, mockGameData, log } from "./util";

// App 启动前钩子
class AppBootHook {
  app: Application;
  connection: Connection;

  constructor(app: Application) {
    this.app = app;
  }

  async willReady() {
    log("=== TypeORM Starting ===");

    createConnection()
      .then(async (connection) => {
        log("=== Database Connection Established ===");
        await connection.manager.insert(User, mockUserData(5));
        await connection.manager.insert(Game, mockGameData(5));
        await connection.manager.insert(Flow, {
          uid: "1",
          gid: "1",
          isLike: true,
        });
        this.app.applicationContext.registerObject("connection", connection);

        log("=== Initial [User & Game] Info Injected Successfully ===");
      })
      .catch((error) => {
        log(error, "red");
        log("Oops! An Error Occured", "red");
      });
  }

  async beforeClose() {
    this.connection = getConnection();
    await this.connection.synchronize();
    await this.connection.dropDatabase();
    await this.connection.close();
  }
}

export default AppBootHook;
