import * as Koa from 'koa';

export default class FireCat {
    public koa: Koa;

    constructor() {
        this.koa = new Koa();
    }
}