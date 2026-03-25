import * as Koa from 'koa';
import {Context, FireCatFace} from "../types";
import * as bodyParser from 'koa-bodyparser';

export default class FireCat {
    public koa: Koa;

    constructor(config: FireCatFace = {}) {
        this.koa = new Koa(config.koaConfig);
        this.koa.use(bodyParser(config.bodyParserConfig));
        this.koa.use(async (ctx, next) => {
            try {
                await next();
            } catch (err: any) {
                ctx.status = 500;
                ctx.app.emit('error', err, ctx);
                this.onError(ctx, err)
            }
        })
    }

    onError(ctx: Context, err: Error) {
        if (!ctx.body) {
            ctx.body = {
                success: false,
                message: err.message,
            };
        }
    }
}
