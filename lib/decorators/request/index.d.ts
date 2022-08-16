export declare function Get(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Post(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Del(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Head(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Put(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function All(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Request(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
