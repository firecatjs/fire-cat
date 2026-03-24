import { FireDocumentHeadInterFace, FireDocumentStoreInterFace } from "../types";
import { FireCatRouter } from "../router/router";
export declare class FireDocument {
    static documents: FireDocumentStoreInterFace[];
    static appendDocument(path: string, routes: FireDocumentStoreInterFace['routes']): void;
    static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace): void;
}
