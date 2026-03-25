import * as Router from '@koa/router';
import { FireCatController } from "../controller";
import { FireDocumentStoreInterFace, KoaMiddleware } from '../types';
export default class FireRouterGroup {
    router: Router;
    path: string;
    private registerDocument?;
    constructor(router: Router, path: string, registerDocument?: (entry: FireDocumentStoreInterFace) => void);
    concat(path: string, action: Router.Middleware<any, any>, methods: string): any;
    concatCallback(path: string, callback: (router: FireRouterGroup) => void): void;
    get(path: string, action: Router.Middleware<any, any>): any;
    post(path: string, action: Router.Middleware<any, any>): any;
    del(path: string, action: Router.Middleware<any, any>): any;
    put(path: string, action: Router.Middleware<any, any>): any;
    update(path: string, action: Router.Middleware<any, any>): any;
    head(path: string, action: Router.Middleware<any, any>): any;
    all(path: string, action: Router.Middleware<any, any>): any;
    controller(path: string, control: FireCatController, middlewares?: KoaMiddleware[]): void;
    group(path: string, callback: (router: FireRouterGroup) => void): void;
}
