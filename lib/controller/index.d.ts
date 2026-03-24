import * as Router from '@koa/router';
import 'reflect-metadata';
import { FireRouteDefinition, KoaMiddleware } from '../types';
export declare class FireCatController {
    getRouteDefinitions(): FireRouteDefinition[];
    decoratorBindRouter(router: Router, subPath: string, context: any, middlewares?: KoaMiddleware[]): FireRouteDefinition[];
}
