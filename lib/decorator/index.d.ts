import { Context, DecoratorStoreRouterInterFace, InterceptorArrayInterface, InterceptorType } from "../types";
import 'reflect-metadata';
export declare class FireCatDecorator {
    static registerInterceptor(interceptor: (ctx: Context, next: Function, decorator: {
        target: any;
        propertyKey: string;
        descriptor: PropertyDescriptor;
    }) => void, type?: InterceptorType, data?: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
    static registerImplement(implement: any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
}
export declare class DecoratorControllerStore {
    private routerArray;
    getRouterArray(): DecoratorStoreRouterInterFace[];
    appendRouter(decorator: any, path: string, method: string, propertyKey: string): void;
}
export declare class DecoratorStore {
    isInit: boolean;
    private interceptorArray;
    appendInterceptor(wrap: InterceptorArrayInterface): void;
    getInterceptor(): InterceptorArrayInterface[];
    initializationAction(target: any, propertyKey: any, descriptor: any): void;
}
export declare function setDecoratorStoreMetaControllerData(value: any, target: any): void;
export declare function getDecoratorStoreMetaControllerData(target: any): DecoratorControllerStore | null;
export declare function setDecoratorStoreMetaData(value: any, target: any, propertyKey: string): void;
export declare function getDecoratorStoreMetaData(target: any, propertyKey: string): DecoratorStore | null;
