# Midway Demo

[![GitHub license](https://img.shields.io/github/license/linbudu599/React-Testing-Template)](https://github.com/linbudu599/React-Testing-Template/blob/master/LICENSE)
![Codecov](https://img.shields.io/codecov/c/github/linbudu599/Midway-Article-Demo)
![GitHub top language](https://img.shields.io/github/languages/top/linbudu599/Midway-Article-Demo)
![David](https://img.shields.io/david/dev/linbudu599/Midway-Article-Demo)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/linbudu599/Midway-Article-Demo)

> Midway 文章 Demo

## TODO

- [x] 基本User表及CRUD
- [x] **User** & **Game** & **Flow** 表CRUD, 联查 & 事务
- [x] **全局** 及 **路由** 中间件
- [ ] `controller` & `service` 单元测试
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

在一部分配置不够(比如我的)电脑上, 运行单元测试可能会报错`Async Callback Not Invoked ...`, 这是因为Midway在启动时会**扫描整个目录**去收集`@provide()`的数据, 一旦时间超过**3000ms(Jest默认的异步超时时间)**, 就会报错. 解决方式是项目下的`jest.setup.js`文件, 来手动调整超时时间.