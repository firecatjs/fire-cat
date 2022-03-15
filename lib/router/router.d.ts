import * as Router from 'koa-router';
import FireRouterGroup from "../router/group";
import { FireCatController } from "../controller";
export declare class FireCatRouter {
    router: Router;
    constructor();
    group(path: string, callback: (router: FireRouterGroup) => void): void;
    controller(path: string, control: FireCatController): void;
}
