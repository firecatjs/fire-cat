import * as Router from 'koa-router';
import FireRouterGroup from "../router/group";
import {FireCatController} from "../controller";

export class FireCatRouter {
  public router: Router;

  constructor() {
    this.router = new Router();
  }

  group(path: string, callback: (router: FireRouterGroup)=> void) {
    callback(new FireRouterGroup(this.router, path))
  }

  controller(path: string, control: FireCatController) {
    control.decoratorBindRouter(this.router, path, control)
  }
}