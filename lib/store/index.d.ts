import { DecoratorRepository } from "../decorator";
export declare class FireStore {
    static store: Map<any, DecoratorRepository>;
    static check(classKey: any): void;
    static getDecoratorRepository(classKey: any): DecoratorRepository | null;
}
