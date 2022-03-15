import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

export default class FireCat {
    public koa: Koa;

    constructor() {
        this.koa = new Koa();
        this.koa.use(bodyParser())
        this.koa.on('error', (err) => {
            console.log('[ERROR]')
            console.log(err)
        })
    }
}