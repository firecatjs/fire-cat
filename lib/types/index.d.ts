import * as Validator from "fastest-validator";
import * as Koa from "koa";
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
}
export interface CreateSchemaInterFace {
    jsonRule: object;
    v: Validator.SyncCheckFunction;
}
