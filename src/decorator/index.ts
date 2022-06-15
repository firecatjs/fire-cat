import {Context} from "../types";

export class FireCatDecorator {

  // 注册拦截器
  static registerInterceptor(interceptor: (ctx: Context, next: Function, decorator: {target: any, propertyKey: string, descriptor: PropertyDescriptor}) => void) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

      console.log({
        target: target,
        'target2': '9999'
      })

      // 如果有存在的话
      if (interceptor) {
        target.insertInterceptor(target, propertyKey)
      }

      // 初始化
      target.initializationAction(target, propertyKey, descriptor)

      return descriptor
    }
  }

  // 注册函数执行前操作
  static registerImplement(implement) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      if (typeof implement == 'function') {
        implement(target, propertyKey, descriptor)
      }
    }
  }

}