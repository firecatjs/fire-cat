import { FireDocumentHeadInterFace, FireDocumentInterFace, FireDocumentStoreInterFace } from "../types";
import { FireCatRouter } from "../router/router";
export declare class FireDocument {
    static documents: FireDocumentStoreInterFace[];
    static appendDocument(path: string, routes: FireDocumentStoreInterFace['routes']): void;
    static createDocumentPayload(router: FireCatRouter, config: FireDocumentHeadInterFace): FireDocumentInterFace;
    static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace): void;
    static renderDocumentPage(doc: FireDocumentInterFace, jsonPath: string): string;
}
