import {FireCat, FireCatLog} from "../src";
import {fireCatRouter} from "./router";

const app = new FireCat();

const log = new FireCatLog({
  filename: process.cwd() + '/logs/app.log'
});

app.koa.use(log.action())

app.koa.use(fireCatRouter.router.routes());

app.onError = (ctx, err) => {
  console.log(err)
  log.logError(ctx)
  ctx.body = {
    success: false,
    code: 500
  }
}

app.koa.listen('3010');

console.log(
  `🐳️app is running at http://127.0.0.1:3010`,
);
