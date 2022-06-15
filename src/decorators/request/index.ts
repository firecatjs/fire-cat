import {FireCatDecorator} from '../../decorator'

function registerRouterPut(target, decorator, path: string, method: string) {
  try {
    target.decoratorList = target.decoratorList || []
    target.decoratorList.push({
      path: path ? ('/' + path) : path,
      controller: decorator.value,
      method
    })
  } catch (e) {
    //
  }
}

export function Get(path: string) {
  return FireCatDecorator.registerImplement((target, key, decorator)=> {
    registerRouterPut(target, decorator, path, 'get')
  })
}

export function Post(path: string) {
  return FireCatDecorator.registerImplement((target, key, decorator)=> {
    registerRouterPut(target, decorator, path, 'post')
  })
}

export function Request() {
  return FireCatDecorator.registerInterceptor((ctx, next)=> {
    if (ctx.method == 'GET') {
      ctx.request.body = ctx.request.query
    }
    next()
  })
}