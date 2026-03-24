import { Context, DecoratorDocDesInterFace, FireRouteDefinition, FireRouteMethod, InterceptorArrayInterface, InterceptorType } from "../types";
import 'reflect-metadata';
export declare class DecoratorRepository {
    private routes;
    private docDescriptions;
    private middlewares;
    addRoute(handler: Function, path: string, method: FireRouteMethod, propertyKey: string): void;
    addMiddleware(propertyKey: string, middleware: any): void;
    addDocDeses(doc: DecoratorDocDesInterFace): void;
    getDocDeses(): {
        propertyKey: string;
        description: string;
    }[];
    getRoutes(): {
        description: string;
        path: string;
        controller: Function;
        method: FireRouteMethod;
        propertyKey: string;
    }[];
    getMiddlewares(propertyKey: string): InterceptorArrayInterface[];
    getRouteDefinitions(): FireRouteDefinition[];
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
