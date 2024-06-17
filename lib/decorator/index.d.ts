import { Context, DecoratorDocDesInterFace, DecoratorStoreRouterInterFace, InterceptorArrayInterface, InterceptorType } from "../types";
import 'reflect-metadata';
export declare class DecoratorRepository {
    private routers;
    private docDeses;
    private middlewares;
    private interceptors;
    addInterceptor(interceptor: any): void;
    addRoute(decorator: any, path: string, method: string, propertyKey: string): void;
    addMiddleware(propertyKey: string, middleware: any): void;
    addDocDeses(doc: DecoratorDocDesInterFace): void;
    getDocDeses(): DecoratorDocDesInterFace[];
    getInterceptors(): InterceptorArrayInterface[];
    getRoutes(): DecoratorStoreRouterInterFace[];
    getMiddlewares(propertyKey: string): InterceptorArrayInterface[];
}
export declare function FireDecoratorController(): (constructor: Function) => void;
export declare class FireCatDecorator {
    static registerInterceptor(interceptor: (ctx: Context, next: Function, decorator: {
        target: any;
        propertyKey: string;
        descriptor: PropertyDescriptor;
    }) => void, type?: InterceptorType, data?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    static registerImplement(implement: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
export declare function getDecoratorRepositoryController(target: any): DecoratorRepository;
