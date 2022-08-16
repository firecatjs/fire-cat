import * as Router from 'koa-router';
import FireRouterGroup from "../router/group";
import {FireCatController} from "../controller";
import {FireDocument} from "../document";

export class FireCatRouter {
  public router: Router;

  constructor() {
    this.router = new Router();
  }

  enableDocument(path: string = '/document') {
    FireDocument.server(this, path)
  }

  group(path: string, callback: (router: FireRouterGroup)=> void) {
    callback(new FireRouterGroup(this.router, path))
  }

  controller(path: string, control: FireCatController) {
    control.decoratorBindRouter(this.router, path, control)
  }
}