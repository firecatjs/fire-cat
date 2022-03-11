import FireCat from "./fire";
import {FireCatController} from "./controller";
import {FireCatRouter} from "./router/router";
import {FireCatLog} from "./log";
import {FireCatDecorator} from "./decorator";
import {FireCatVerify, FireCatVerifyWrap} from "./decorators/verify/verify";
import {Get, Post, Request} from "./decorators/request"
import {createSchema} from './decorators/verify/fastValidator'

export {
  FireCat,
  FireCatController,
  FireCatRouter,
  FireCatLog,
  FireCatDecorator,

  FireCatVerify,
  Get,
  Post,
  Request,
  FireCatVerifyWrap,
  createSchema,
}