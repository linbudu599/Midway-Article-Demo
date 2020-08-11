# Midway Demo

[![GitHub license](https://img.shields.io/github/license/linbudu599/React-Testing-Template)](https://github.com/linbudu599/React-Testing-Template/blob/master/LICENSE)
![Codecov](https://img.shields.io/codecov/c/github/linbudu599/Midway-Article-Demo)
![GitHub top language](https://img.shields.io/github/languages/top/linbudu599/Midway-Article-Demo)
![David](https://img.shields.io/david/dev/linbudu599/Midway-Article-Demo)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/linbudu599/Midway-Article-Demo)

> Midway 文章 Demo

## Start

- 请确保你的电脑上安装了`SQLite3`

## TODO

- [x] 基本 User 表及 CRUD
- [x] **User** & **Game** & **Flow** 表 CRUD, 联查 & 事务
- [x] **全局** 及 **路由** 中间件
- [x] 日志对象注入
- [ ] ~~`controller` & `service` 单元测试~~, Mac 和 Windows 上表现有一定差异,暂时跳过.
- [ ] 基于 `GitHub Actions` / `Travis CI` 部署

## 目录结构

```text
| .github ----- GitHub Actions 工作流配置
| coverage ----- 测试覆盖率报告
| logs ----- 日志文件, 包含自定义的logger配置
| run ----- midway 运行时文件
| src ----- 主应用目录
|  | app
|  |  |  controller ----- user/game 路由控制器
|  |  |  public ----- 公共文件
|  | config ----- 配置文件, 支持根据环境变量选择加载
|  | entity ----- TypeORM 实体
|  | interface ----- 类型接口定义
|  | service ----- 主要逻辑, 在这里与调用TypeORM
|  | util ----- 工具人函数
|  test ----- 测试用例
```

## Notice!

在一部分配置不够(比如我的)电脑上, 运行单元测试可能会报错`Async Callback Not Invoked ...`, 这是因为 Midway 在启动时会**扫描整个目录**去收集`@provide()`的数据, 一旦时间超过**3000ms(Jest 默认的异步超时时间)**, 就会报错. 解决方式是项目下的`jest.setup.js`文件, 来手动调整超时时间.

## 接口文档

### `/user`

- **GET** `/user/all` 获取所有用户(初始化会填入 mock 用户数据)
- **POST** `/user/create` 创建用户(使用 body 携带的数据,uid 自增)
- **GET** `/user/uid/:uid` 根据 uid 获取用户
- **DELETE** `/user/uid/:uid` 根据 uid 删除用户
- **GET** `/user/fillMockData` 新增 mock 用用户数据
- **GET** `/user/like/:uid` 获取用户喜欢的游戏

### `/game`

- **GET** `/game/all` 获取所有游戏(初始化填入 mock 游戏数据)
- **GET** `/game/gid/:gid` 根据 gid 获取游戏信息
- **POST** `/game/like` `body{gid, uid}` uid 用户点赞 gid 游戏
- **POST** `/game/unlike` `body{gid, uid}` uid 用户取消点赞 gid 游戏
