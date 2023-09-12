import {FireCatDecorator} from '../../decorator'
import {fastValidator} from './fastValidator';
import {Context, CreateSchemaInterFace, InterceptorType} from "../../types";
import {FireValidatorErrorType} from "../../types";

export function FireCatVerifyWrap(wrap: (message: FireValidatorErrorType | null, ctx: Context, next: Function)=> void) {
  return function CatVerify(jsonRule: CreateSchemaInterFace) {
    return FireCatDecorator.registerInterceptor(async (ctx, next)=> {
      const bodyData = ctx.method == 'GET' ? ctx.request.query : (ctx.request.body || {})
      const errors = fastValidator(bodyData, jsonRule.v);
      await wrap(errors, ctx, next)
    }, InterceptorType.RULE, jsonRule.jsonRule)
  }
}

export const FireCatVerify = FireCatVerifyWrap(async (message, ctx, next)=> {
  if (message) {
    ctx.body = message.message
  } else {
    await next()
  }
})