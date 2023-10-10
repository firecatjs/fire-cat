import {FireCatDecorator, getDecoratorStoreMetaControllerData} from '../../decorator'
import {InterceptorType} from "../../types";

function registerRouterPut(target, propertyKey, decorator, path: string, method: string) {
  try {
    const store = getDecoratorStoreMetaControllerData(target)
    if (store) {
      store.appendRouter(decorator, path, method, propertyKey)
    }
  } catch (e) {
    //
  }
}

export function Get(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'get')
  })
}

export function Post(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'post')
  })
}

export function Del(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'del')
  })
}

export function Head(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'head')
  })
}

export function Update(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'update')
  })
}

export function Put(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'put')
  })
}

export function All(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'all')
  })
}

export function Request() {
  return FireCatDecorator.registerInterceptor((ctx, next)=> {
    if (ctx.method == 'GET') {
      ctx.request.body = {
        ...ctx.request.query
      }
    } else {
      ctx.request.body = ctx.request.body || {}
    }
    next()
  }, InterceptorType.WRAP)
}