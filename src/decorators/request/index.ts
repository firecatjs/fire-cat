import {FireCatDecorator, getDecoratorRepositoryController} from '../../decorator'
import {FireRouteMethod, InterceptorType} from "../../types";

function registerRouterPut(target, propertyKey, descriptor, path: string, method: FireRouteMethod) {
  const store = getDecoratorRepositoryController(target)
  if (store) {
    store.addRoute(descriptor.value, path, method, propertyKey)
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

export const Delete = Del;

export function Head(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'head')
  })
}

export function Update(path: string) {
  return FireCatDecorator.registerImplement((target, propertyKey, decorator)=> {
    registerRouterPut(target, propertyKey, decorator, path, 'patch')
  })
}

export const Patch = Update;

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
  return FireCatDecorator.registerInterceptor(async (ctx, next)=> {
    const query = ctx.request.query || {}
    const body = ctx.request.body || {}
    ctx.request.body = ctx.method === 'GET'
      ? {...query}
      : {
        ...query,
        ...body
      }
    await next()
  }, InterceptorType.WRAP)
}
