export declare function Get(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Post(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Request(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
