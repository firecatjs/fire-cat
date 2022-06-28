import * as Koa from 'koa';
import { Context } from "../types";
export default class FireCat {
    koa: Koa;
    constructor();
    onError(ctx: Context, err: Error): void;
}
