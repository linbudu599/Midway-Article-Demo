import { Middleware } from "midway";
import { log } from "../../util";

interface ICORSOptions {
  methods: string[];
  origin: string[];
}

const cors = ({ methods, origin }: ICORSOptions): Middleware => {
  return async (ctx, next) => {
    log("=== CORS Middlware Invoked ===");
    log(`Allowed Methods: ${methods}`);
    log(`Allowed Origin: ${origin}`);

    ctx.set("Access-Control-Allow-Origin", origin);
    ctx.set("Access-Control-Allow-Methods", methods);

    ctx.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
    );

    ctx.method.toUpperCase() === "OPTIONS" ? (ctx.body = 200) : await next();
  };
};

export default cors;
