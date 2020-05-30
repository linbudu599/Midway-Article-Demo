import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { Application } from "midway";
import { Container } from "typedi";

// 使用TypeDI提供的容器
useContainer(Container);

// App 启动前钩子
class AppBootHook {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async willReady() {
    console.log("=== TypeORM Starting ===");

    createConnection("default")
      .then(async (connection) => {
        console.log("=== Database Connection Established ===");
        // insert initial user info
        // await connection.manager.insert()
        console.log("=== Initial Info Injected Successfully ===");
      })
      .catch((error) => {
        console.log("Oops! An Error Occured");
      });
  }
}

export default AppBootHook;
