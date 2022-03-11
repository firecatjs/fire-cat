import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import {Context} from "../types";

export default class FireCat {
    public koa: Koa;

    static onServerError(ctx: Context, e: Error) {
        ctx.body = 'server error'
        ctx.status = 500
        console.error(e)
    }

    constructor() {
        this.koa = new Koa();
        this.koa.use(bodyParser())
    }
}