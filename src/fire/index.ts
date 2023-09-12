import * as Koa from 'koa';
import {Context} from "../types";
import * as bodyParser from 'koa-bodyparser';

export default class FireCat {
    public koa: Koa;

    constructor() {
        this.koa = new Koa();
        this.koa.use(bodyParser());
        this.koa.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                ctx.status = 500;
                this.onError(ctx, err)
            }
        })
    }

    onError(ctx: Context, err: Error) {
        console.log(err)
    }
}