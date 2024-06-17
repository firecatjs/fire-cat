import { Context, CreateSchemaInterFace } from "../../types";
import { FireValidatorErrorType } from "../../types";
export declare function FireCatVerifyWrap(wrap: (message: FireValidatorErrorType | null, ctx: Context, next: Function) => void): (jsonRule: CreateSchemaInterFace) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const FireCatVerify: (jsonRule: CreateSchemaInterFace) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
