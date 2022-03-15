import * as Validator from "fastest-validator";
import { Context } from "../../types";
import { FireValidatorErrorType } from "../../types";
export declare function FireCatVerifyWrap(wrap: (message: FireValidatorErrorType | null, ctx: Context, next: Function) => void): (jsonRule: Validator.SyncCheckFunction) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const FireCatVerify: (jsonRule: Validator.SyncCheckFunction) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
