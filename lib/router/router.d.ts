import * as Router from 'koa-router';
import FireRouterGroup from "../router/group";
import { FireCatController } from "../controller";
import { FireDocumentHeadInterFace } from "../types";
export declare class FireCatRouter {
    router: Router;
    constructor();
    enableDocument(path?: string, config?: FireDocumentHeadInterFace): void;
    group(path: string, callback: (router: FireRouterGroup) => void): void;
    controller(path: string, control: FireCatController): void;
}
