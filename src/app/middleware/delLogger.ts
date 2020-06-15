import {
  Middleware,
  WebMiddleware,
  provide,
  config,
  inject,
  EggAppConfig,
} from "midway";

import { log } from "../../util";

@provide()
export class DelMw implements WebMiddleware {
  @config("delRouter")
  delConfig: EggAppConfig;

  resolve(): Middleware {
    return async (ctx, next) => {
      ctx.auth = this.delConfig.auth;

      log(
        `=== DEL Router Mw Invoked With UID: ${ctx.params.uid} & Auth: ${ctx.auth} ===`
      );
      await next();

      log("=== DEL Router Mw End");
    };
  }
}
