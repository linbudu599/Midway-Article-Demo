import 'reflect-metadata';
import { createConnection, useContainer } from 'typeorm';
import { Application } from 'midway';
import { Container } from 'typedi';
import { User, Game } from './entity';
import { mockUserData, mockGameData, log } from './util';

// 使用TypeDI提供的容器
useContainer(Container);

// App 启动前钩子
class AppBootHook {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async willReady() {
    log('=== TypeORM Starting ===');

    createConnection()
      .then(async (connection) => {
        log('=== Database Connection Established ===');
        await connection.manager.insert(User, mockUserData(5));
        await connection.manager.insert(Game, mockGameData(5));
        log('=== Initial [User & Game] Info Injected Successfully ===');
      })
      .catch((error) => {
        log(error, 'red');
        log('Oops! An Error Occured', 'red');
      });
  }
}

export default AppBootHook;
