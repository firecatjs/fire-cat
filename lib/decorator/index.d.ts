import { Context } from "../types";
export declare class FireCatDecorator {
    static register(props: {
        wrap?: (ctx: Context, next: Function, decorator: {
            target: any;
            propertyKey: string;
            descriptor: PropertyDescriptor;
        }) => void;
        before?: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    }): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
}
