import * as Router from 'koa-router';
import FireRouterGroup from "../router/group";
import {FireCatController} from "../controller";
import {FireDocument} from "../document";
import {FireDocumentHeadInterFace} from "../types";

export class FireCatRouter {
  public router: Router;

  constructor() {
    this.router = new Router();
  }

  enableDocument(path: string = '/document', config?: FireDocumentHeadInterFace) {
    FireDocument.server(this, path, config || {
      title: 'api document',
      date: new Date(),
      description: 'a api document',
      version: '1.0.0'
    })
  }

  group(path: string, callback: (router: FireRouterGroup)=> void) {
    callback(new FireRouterGroup(this.router, path))
  }

  controller(path: string, control: FireCatController) {
    control.decoratorBindRouter(this.router, path, control)
  }
}