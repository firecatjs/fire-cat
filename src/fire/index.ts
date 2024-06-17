import * as Koa from 'koa';
import {Context, FireCatFace} from "../types";
import * as bodyParser from 'koa-bodyparser';

export default class FireCat {
    public koa: Koa;

    constructor(config: FireCatFace = {}) {
        this.koa = new Koa(config.koaConfig);
        this.koa.use(bodyParser());
        this.koa.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = 500;
                ctx.app.emit('error', err, ctx);
                this.onError(ctx, err)
            }
        })
    }

    onError(ctx: Context, err: Error) {
        console.log(err)
    }
}