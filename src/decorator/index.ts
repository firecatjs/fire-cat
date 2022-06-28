import {Context, DecoratorStoreRouterInterFace, InterceptorArrayInterface, InterceptorType} from "../types";
import 'reflect-metadata'

const DecoratorControllerNameSpace = 'decorator_controller'
const DecoratorStoreNameSpace = 'decorator_store'

export class FireCatDecorator {

  // 注册拦截器
  static registerInterceptor(
    interceptor: (ctx: Context, next: Function, decorator: {target: any, propertyKey: string, descriptor: PropertyDescriptor}) => void,
    type: InterceptorType = InterceptorType.WRAP,
    data?: any
  ) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      let store = getDecoratorStoreMetaData(target, propertyKey)

      if (!store) {
        setDecoratorStoreMetaData(
          store = new DecoratorStore(),
          target,
          propertyKey,
        )
      }

      // 初始化
      if (store) {
        if (!store.isInit) {
          store.initializationAction(target, propertyKey, descriptor)
        }
      }

      // 如果有存在的话
      if (interceptor) {
        store.appendInterceptor({
          controller: interceptor,
          propertyKey,
          type,
          data
        })
      }

      return descriptor
    }
  }

  // 注册函数执行前操作
  static registerImplement(implement) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

      let store = getDecoratorStoreMetaControllerData(target)

      if (!store) {
        setDecoratorStoreMetaControllerData(
          new DecoratorControllerStore(),
          target,
        )
      }

      if (typeof implement == 'function') {
        implement(target, propertyKey, descriptor)
      }
    }
  }

}

// 控制器盒子
export class DecoratorControllerStore {
  // router
  private routerArray: DecoratorStoreRouterInterFace[] = []
  public getRouterArray() {
    return this.routerArray
  }
  public appendRouter(decorator, path: string, method: string, propertyKey: string) {
    this.routerArray.push({
      path: path ? ('/' + path) : path,
      controller: decorator.value,
      method,
      propertyKey
    })
  }
}


// 字段存储仓库
export class DecoratorStore {

  public isInit: boolean = false

  // wrap
  private interceptorArray: InterceptorArrayInterface[] = [];
  public appendInterceptor(wrap: InterceptorArrayInterface) {
    this.interceptorArray.unshift(wrap)
  }

  // 初始化函数
  public initializationAction(target, propertyKey, descriptor) {

    this.isInit = true

    const original = descriptor.value;

    const regArray = this.interceptorArray

    if (typeof original === 'function') {

      descriptor.value = async function (ctx, next) {

        let isNext = true
        let index = 0

        while (isNext) {
          const fn = regArray[index]

          if (index < regArray.length) {
            index++
          } else {
            break
          }

          isNext = false

          if (fn) {
            await fn.controller(ctx, ()=> {
              isNext = true
            }, {
              target,
              propertyKey,
              descriptor
            })
          }
        }

        if (isNext) {
          try {
            await original.call(this, ctx, next);
          } catch (e) {
            throw e
          }
        }
      }
    }
  }

}

function setMetaData(
  key,
  value,
  target,
  propertyKey?: string
) {
  Reflect.defineMetadata(key, value, target, propertyKey);
}

function getMetaData(
  key,
  target,
  propertyKey?: string
) {
  return Reflect.getMetadata(key, target, propertyKey)
}


export function setDecoratorStoreMetaControllerData(value, target) {
  setMetaData(
    DecoratorControllerNameSpace,
    value,
    target,
  )
}

export function getDecoratorStoreMetaControllerData(target): DecoratorControllerStore | null {
  return getMetaData(
    DecoratorControllerNameSpace,
    target,
  )
}

export function setDecoratorStoreMetaData(value, target, propertyKey: string) {
  setMetaData(
    DecoratorStoreNameSpace,
    value,
    target,
    propertyKey
  )
}

export function getDecoratorStoreMetaData(target, propertyKey: string): DecoratorStore | null {
  return getMetaData(
    DecoratorStoreNameSpace,
    target,
    propertyKey
  )
}