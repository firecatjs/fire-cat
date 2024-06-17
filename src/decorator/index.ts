import { FIRE_REPOSITORY_METADATA_KEY } from "../config/fireKeys";
import {
  Context,
  DecoratorDocDesInterFace,
  DecoratorStoreRouterInterFace,
  InterceptorArrayInterface,
  InterceptorType
} from "../types";
import 'reflect-metadata'
import { FireStore } from "../store";

export class DecoratorRepository {

  private routers: DecoratorStoreRouterInterFace[] = []
  private docDeses: DecoratorDocDesInterFace[] = []

  private middlewares: { [key: string]: InterceptorArrayInterface[] } = {};
  private interceptors: InterceptorArrayInterface[] = [];

  addInterceptor(interceptor: any) {
    this.interceptors.push(interceptor);
  }

  addRoute(decorator, path: string, method: string, propertyKey: string) {

    let betterPath = path
    if (!/^\//.test(betterPath)) {
      betterPath = '/' + betterPath
    }

    this.routers.push({
      path: betterPath,
      controller: decorator.value,
      method,
      propertyKey
    })
  }

  addMiddleware(propertyKey: string, middleware: any) {
    if (!this.middlewares[propertyKey]) {
      this.middlewares[propertyKey] = [];
    }
    this.middlewares[propertyKey].push(middleware);
  }

  public addDocDeses(doc: DecoratorDocDesInterFace) {
    this.docDeses.push(doc)
  }

  public getDocDeses() {
    return this.docDeses;
  }

  getInterceptors() {
    return this.interceptors;
  }

  getRoutes() {
    return this.routers;
  }

  getMiddlewares(propertyKey: string) {
    return this.middlewares[propertyKey] || [];
  }
}

// 装饰器工厂方法，用于将仓库实例绑定到类上
export function FireDecoratorController() {
  return function (constructor: Function) {
    const repository = new DecoratorRepository();
    Reflect.defineMetadata(FIRE_REPOSITORY_METADATA_KEY, repository, constructor.prototype);
  };
}

export class FireCatDecorator {

  // 注册拦截器
  static registerInterceptor(
    interceptor: (ctx: Context, next: Function, decorator: {target: any, propertyKey: string, descriptor: PropertyDescriptor}) => void,
    type: InterceptorType = InterceptorType.WRAP,
    data?: any
  ) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

      FireStore.check(target.constructor)

      const repository: DecoratorRepository = getDecoratorRepositoryController(target);
      
      repository.addMiddleware(propertyKey, {
        controller: interceptor,
        propertyKey,
        type,
        data
      });

    };
  }

  // 注册函数执行前操作
  static registerImplement (implement) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      FireStore.check(target.constructor)
      
      if (typeof implement == 'function') {
        implement(target, propertyKey, descriptor)
      }
    }
  }

}

export function getDecoratorRepositoryController (target: any) : DecoratorRepository  {
  return FireStore.getDecoratorRepository(target.constructor);
}