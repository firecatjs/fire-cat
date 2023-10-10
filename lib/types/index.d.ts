import * as Validator from "fastest-validator";
import * as Koa from "koa";
import { DecoratorControllerStore } from "../decorator";
import * as bodyParser from 'koa-bodyparser';
export interface FireValidatorErrorType {
    message: string;
    details: Validator.ValidationError[];
}
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
    method: string;
    propertyKey: string;
    description?: string;
}
export interface DecoratorDocDesInterFace {
    propertyKey: string;
    description: string;
}
export interface CreateSchemaInterFace {
    jsonRule: object;
    v: Validator.SyncCheckFunction;
}
export interface FireDocumentStoreInterFace {
    path: string;
    context: DecoratorControllerStore;
    target: any;
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
    bodyParserConfig?: bodyParser.Options;
    koaConfig?: FireCatKoaFace;
}
