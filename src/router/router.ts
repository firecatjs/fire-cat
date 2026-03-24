import * as Router from '@koa/router';
import FireRouterGroup from "../router/group";
import {FireCatController} from "../controller";
import {FireDocument} from "../document";
import {FireDocumentHeadInterFace, FireDocumentStoreInterFace, KoaMiddleware} from "../types";
import {isStartRouter} from "../utils/common";

export class FireCatRouter {
  public router: Router;
  private documentStore: FireDocumentStoreInterFace[] = [];

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
    callback(new FireRouterGroup(this.router, path, (entry) => {
      this.documentStore.push(entry);
      FireDocument.appendDocument(entry.path, entry.routes);
    }))
  }

  controller(path: string, control: FireCatController, middlewares?: KoaMiddleware[]) {
    const basePath = isStartRouter(path) ? '' : path;
    const routes = control.decoratorBindRouter(this.router, basePath, control, middlewares);
    this.documentStore.push({
      path: basePath || '/',
      routes
    });
    FireDocument.appendDocument(basePath || '/', routes);
  }

  getDocumentStore() {
    return this.documentStore;
  }
}
