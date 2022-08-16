import * as Validator from "fastest-validator";
import * as Koa from "koa";
import {DecoratorControllerStore} from "../decorator";

export interface FireValidatorErrorType {
  message: string;
  details: Validator.ValidationError[]
}

export interface SyncCheckFunction extends Validator.SyncCheckFunction {}

export interface Context extends Koa.Context {}

export enum InterceptorType {
  WRAP, // 普通拦截器
  RULE, // 验证拦截器
}

export interface InterceptorArrayInterface {
  controller: Function;
  propertyKey: string;
  type: InterceptorType;
  data?: any
}

export interface DecoratorStoreRouterInterFace {
  path: string;
  controller: Function;
  method: string;
  propertyKey: string;
}

export interface CreateSchemaInterFace {
  jsonRule: object;
  v:  Validator.SyncCheckFunction
}

export interface FireDocumentStoreInterFace {
  path: string;
  context: DecoratorControllerStore;
  target: any;
}

export interface FireDocumentInterFace {
  body: FireDocumentBodyInterFace[];
}

export interface FireDocumentBodyInterFace {
  path: string;
  methods: string;
  rule: any[];
}