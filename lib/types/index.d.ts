import * as Validator from "fastest-validator";
import * as Koa from "koa";
import * as bodyParser from 'koa-bodyparser';
export interface FireValidatorErrorType {
    message: string;
    details: Validator.ValidationError[];
}
export type KoaMiddleware = (ctx: Context, next: Koa.Next) => Promise<void>;
export type FireRouteMethod = 'all' | 'del' | 'get' | 'head' | 'patch' | 'post' | 'put';
export interface SyncCheckFunction extends Validator.SyncCheckFunction {
}
export interface Context extends Koa.Context {
}
export declare enum InterceptorType {
    WRAP = 0,
    RULE = 1
}
export interface InterceptorArrayInterface {
    controller: Function;
    propertyKey: string;
    type: InterceptorType;
    data?: any;
}
export interface DecoratorStoreRouterInterFace {
    path: string;
    controller: Function;
    method: FireRouteMethod;
    propertyKey: string;
    description?: string;
}
export interface DecoratorDocDesInterFace {
    propertyKey: string;
    description: string;
}
export interface FireRouteDefinition {
    method: FireRouteMethod;
    path: string;
    propertyKey: string;
    handler: Function;
    description?: string;
    middlewares: InterceptorArrayInterface[];
}
export interface CreateSchemaInterFace {
    jsonRule: object;
    v: Validator.SyncCheckFunction;
}
export interface FireDocumentStoreInterFace {
    path: string;
    routes: FireRouteDefinition[];
}
export interface FireDocumentHeadInterFace {
    title?: string;
    version?: string | number;
    date?: string | Date;
    description?: string;
}
export interface FireDocumentInterFace {
    body: FireDocumentBodyInterFace[];
    title?: string;
    version?: string | number;
    date?: string | Date;
    description?: string;
}
export interface FireDocumentBodyInterFace {
    path: string;
    methods: string;
    rule: any[];
    description?: string;
}
export interface FireCatKoaFace {
    env?: string | undefined;
    keys?: string[] | undefined;
    proxy?: boolean | undefined;
    subdomainOffset?: number | undefined;
    proxyIpHeader?: string | undefined;
    maxIpsCount?: number | undefined;
}
export interface FireCatFace {
    bodyParserConfig?: BodyParserOptions;
    koaConfig?: FireCatKoaFace;
}
export declare function bodyParser(opts?: bodyParser.Options): Koa.Middleware;
export interface BodyParserOptions {
    enableTypes?: string[] | undefined;
    encoding?: string | undefined;
    formLimit?: string | undefined;
    jsonLimit?: string | undefined;
    textLimit?: string | undefined;
    xmlLimit?: string | undefined;
    strict?: boolean | undefined;
    detectJSON?: ((ctx: Koa.Context) => boolean) | undefined;
    extendTypes?: {
        json?: string[] | string | undefined;
        form?: string[] | string | undefined;
        text?: string[] | string | undefined;
    } | undefined;
    onerror?: ((err: Error, ctx: Koa.Context) => void) | undefined;
}
