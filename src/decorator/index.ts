import { FIRE_REPOSITORY_METADATA_KEY } from "../config/fireKeys";
import {
  Context,
  DecoratorDocDesInterFace,
  DecoratorStoreRouterInterFace,
  FireRouteDefinition,
  FireRouteMethod,
  InterceptorArrayInterface,
  InterceptorType
} from "../types";
import 'reflect-metadata'
import { FireStore } from "../store";

export class DecoratorRepository {

  private routes: DecoratorStoreRouterInterFace[] = []
  private docDescriptions: Map<string, string> = new Map();
  private middlewares: { [key: string]: InterceptorArrayInterface[] } = {};

  addRoute(handler: Function, path: string, method: FireRouteMethod, propertyKey: string) {
    const betterPath = /^\//.test(path) ? path : `/${path}`;

    this.routes.push({
      path: betterPath,
      controller: handler,
      method,
      propertyKey
    });
  }

  addMiddleware(propertyKey: string, middleware: any) {
    if (!this.middlewares[propertyKey]) {
      this.middlewares[propertyKey] = [];
    }
    this.middlewares[propertyKey].unshift(middleware);
  }

  public addDocDeses(doc: DecoratorDocDesInterFace) {
    this.docDescriptions.set(doc.propertyKey, doc.description);
  }

  public getDocDeses() {
    return Array.from(this.docDescriptions.entries()).map(([propertyKey, description]) => ({
      propertyKey,
      description
    }));
  }

  getRoutes() {
    return this.routes.map(route => ({
      ...route,
      description: this.docDescriptions.get(route.propertyKey)
    }));
  }

  getMiddlewares(propertyKey: string) {
    return this.middlewares[propertyKey] || [];
  }

  getRouteDefinitions(): FireRouteDefinition[] {
    return this.getRoutes().map(route => ({
      method: route.method,
      path: route.path,
      propertyKey: route.propertyKey,
      handler: route.controller,
      description: route.description,
      middlewares: this.getMiddlewares(route.propertyKey)
    }));
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
