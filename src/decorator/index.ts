import {
  Context,
  DecoratorDocDesInterFace,
  DecoratorStoreRouterInterFace,
  InterceptorArrayInterface,
  InterceptorType
} from "../types";
import 'reflect-metadata'

// class存储的数据
// 例如：路由
const DecoratorControllerNameSpace = 'decorator_controller'

// class下的方法名字存储的数据
// 例如：方法拦截器
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
  private docDesArray: DecoratorDocDesInterFace[] = []

  public getRouterArray() {
    return this.routerArray
  }
  public appendRouter(decorator, path: string, method: string, propertyKey: string) {

    let betterPath = path
    if (!/^\//.test(betterPath)) {
      betterPath = '/' + betterPath
    }

    this.routerArray.push({
      path: betterPath,
      controller: decorator.value,
      method,
      propertyKey
    })
  }

  public getDocDesArray() {
    return this.docDesArray
  }
  public appendDocDes(doc: DecoratorDocDesInterFace) {
    this.docDesArray.push(doc)
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
  public getInterceptor() {
    return this.interceptorArray
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


// 设置class下对应的控制器存储的DecoratorControllerStore
export function setDecoratorStoreMetaControllerData(value, target) {
  setMetaData(
    DecoratorControllerNameSpace,
    value,
    target,
  )
}

// 获取class下对应的控制器存储的DecoratorControllerStore
export function getDecoratorStoreMetaControllerData(target): DecoratorControllerStore | null {
  return getMetaData(
    DecoratorControllerNameSpace,
    target,
  )
}

// 设置class下对应的方法名存储的DecoratorStore
export function setDecoratorStoreMetaData(value, target, propertyKey: string) {
  setMetaData(
    DecoratorStoreNameSpace,
    value,
    target,
    propertyKey
  )
}

// 获取class下对应的方法名存储的DecoratorStore
export function getDecoratorStoreMetaData(target, propertyKey: string): DecoratorStore | null {
  return getMetaData(
    DecoratorStoreNameSpace,
    target,
    propertyKey
  )
}