import FireCat from "./fire";
import {FireCatController} from "./controller";
import {FireCatRouter} from "./router/router";
import {FireCatLog} from "./log";
import {FireCatDecorator} from "./decorator";
import {FireCatVerify, FireCatVerifyWrap} from "./decorators/verify/verify";
import {Get, Post, Del, Head, Put, Update, Request} from "./decorators/request"
import {createSchema} from './decorators/verify/fastValidator'
import {FireDocument} from "./document";
import {ApiDescription} from './decorators/doc'
export * from './types'
export {
  FireCat,
  FireCatController,
  FireCatRouter,
  FireCatLog,
  FireCatDecorator,
  FireDocument,

  FireCatVerify,
  Get,
  Post,
  Del,
  Head,
  Put,
  Update,
  Request,
  ApiDescription,

  FireCatVerifyWrap,

  createSchema,
}