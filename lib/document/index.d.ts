import { FireDocumentHeadInterFace, FireDocumentStoreInterFace } from "../types";
import { DecoratorControllerStore } from "../decorator";
import { FireCatRouter } from "../router/router";
export declare class FireDocument {
    static documents: FireDocumentStoreInterFace[];
    static appendDocument(path: string, context: DecoratorControllerStore, target: any): void;
    static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace): void;
}
