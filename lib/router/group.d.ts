import * as Router from 'koa-router';
import { FireCatController } from "../controller";
export default class FireRouterGroup {
    router: Router;
    path: string;
    constructor(router: Router, path: string);
    concat(path: string, action: Router.IMiddleware<any, any>, methods: string): any;
    concatCallback(path: string, callback: (router: FireRouterGroup) => void): void;
    get(path: string, action: Router.IMiddleware<any, any>): any;
    post(path: string, action: Router.IMiddleware<any, any>): any;
    delete(path: string, action: Router.IMiddleware<any, any>): any;
    put(path: string, action: Router.IMiddleware<any, any>): any;
    update(path: string, action: Router.IMiddleware<any, any>): any;
    head(path: string, action: Router.IMiddleware<any, any>): any;
    controller(path: string, control: FireCatController): void;
    group(path: string, callback: (router: FireRouterGroup) => void): void;
}
