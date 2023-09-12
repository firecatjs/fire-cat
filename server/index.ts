import {FireCat, FireCatLog} from "../src";
import {fireCatRouter} from "./router";

const app = new FireCat();

export const catLog = new FireCatLog(FireCatLog.defaultConfig({
  filename: process.cwd() + '/logs/app.log',
  pm2: true
}));

// start document service
fireCatRouter.enableDocument('/document', {
  title: '接口文档',
  description: '这是接口文档',
  date: '2022-05-20',
  version: '1.0.0'
})

app.koa.use(fireCatRouter.router.routes());

app.onError = (ctx, err) => {
  console.log(err)
  catLog.logError(ctx, err)
  ctx.body = {
    success: false,
    code: 500
  }
}

app.koa.listen('3010');

console.log(
  `🐳️app is running at http://127.0.0.1:3010`,
);
