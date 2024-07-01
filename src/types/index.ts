import * as Validator from "fastest-validator";
import * as Koa from "koa";
import {DecoratorRepository} from "../decorator";
import * as bodyParser from 'koa-bodyparser';

export interface FireValidatorErrorType {
  message: string;
  details: Validator.ValidationError[]
}

export type KoaMiddleware = (ctx: Context, next: Koa.Next) => Promise<void>;

export interface SyncCheckFunction extends Validator.SyncCheckFunction {}

export interface Context extends Koa.Context { }

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
  description?: string;
}
export interface DecoratorDocDesInterFace {
  propertyKey: string;
  description: string;
}

export interface CreateSchemaInterFace {
  jsonRule: object;
  v:  Validator.SyncCheckFunction
}

export interface FireDocumentStoreInterFace {
  path: string;
  context: DecoratorRepository;
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
  env?: string | undefined,
  keys?: string[] | undefined,
  proxy?: boolean | undefined,
  subdomainOffset?: number | undefined,
  proxyIpHeader?: string | undefined,
  maxIpsCount?: number | undefined
}

export interface FireCatFace {
  bodyParserConfig?: BodyParserOptions;
  koaConfig?: FireCatKoaFace
}

// from @types/koa-bodyparser v4.3.12

export declare function bodyParser(opts?: bodyParser.Options): Koa.Middleware;

export interface BodyParserOptions {
  /**
   *  parser will only parse when request type hits enableTypes, default is ['json', 'form'].
   */
  enableTypes?: string[] | undefined;

  /**
   * requested encoding. Default is utf-8 by co-body
   */
  encoding?: string | undefined;

  /**
   * limit of the urlencoded body. If the body ends up being larger than this limit
   * a 413 error code is returned. Default is 56kb
   */
  formLimit?: string | undefined;

  /**
   * limit of the json body. Default is 1mb
   */
  jsonLimit?: string | undefined;

  /**
   * limit of the text body. Default is 1mb.
   */
  textLimit?: string | undefined;

  /**
   * limit of the xml body. Default is 1mb.
   */
  xmlLimit?: string | undefined;

  /**
   * when set to true, JSON parser will only accept arrays and objects. Default is true
   */
  strict?: boolean | undefined;

  /**
   * custom json request detect function. Default is null
   */
  detectJSON?: ((ctx: Koa.Context) => boolean) | undefined;

  /**
   * support extend types
   */
  extendTypes?: {
      json?: string[] | string | undefined;
      form?: string[] | string | undefined;
      text?: string[] | string | undefined;
  } | undefined;

  /**
   * support custom error handle
   */
  onerror?: ((err: Error, ctx: Koa.Context) => void) | undefined;
}
