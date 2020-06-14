import { EggAppConfig, EggAppInfo, PowerPartial } from "midway";
import path from "path";

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.keys = appInfo.name + "_{{keys}}";

  config.middleware = ["cors"];

  config.security = {
    csrf: false,
  };

  config.cors = {
    method: "*",
    origin: "*",
  };

  config.delRouter = {
    auth: true,
  };

  config.customLogger = {
    delLogger: {
      level: "INFO",
      file: path.join(appInfo.root, "logs/del.log"),
    },
  };

  return config;
};
