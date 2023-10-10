import * as Koa from 'koa';
import { Context, FireCatFace } from "../types";
export default class FireCat {
    koa: Koa;
    constructor(config?: FireCatFace);
    onError(ctx: Context, err: Error): void;
}
