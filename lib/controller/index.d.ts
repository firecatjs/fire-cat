import * as Router from 'koa-router';
import 'reflect-metadata';
import { KoaMiddleware } from '../../src/types';
export declare class FireCatController {
    decoratorBindRouter(router: Router, subPath: string, context: any, middlewares?: KoaMiddleware[]): void;
}
