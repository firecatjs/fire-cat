import { DecoratorRepository } from "../decorator";

export class FireStore {

    static store: Map<any, DecoratorRepository> = new Map();

    static check (classKey: any) {
        if (!this.store.get(classKey)) {
            this.store.set(classKey, new DecoratorRepository())
        }
    }

    static getDecoratorRepository (classKey: any): DecoratorRepository | null {
        return this.store.get(classKey);
    }

}