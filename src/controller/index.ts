import * as Router from 'koa-router';
import {getDecoratorStoreMetaControllerData} from "../decorator";
import 'reflect-metadata'
import {FireDocument} from "../document";

export class FireCatController {

  // 绑定构造的router
  public decoratorBindRouter(router: Router, subPath: string, context: any) {

    const store = getDecoratorStoreMetaControllerData(this)

    if (store) {
      try {
        const list = store.getRouterArray()
        list.forEach(item => {
          router[item.method](subPath + item.path, item.controller.bind(context))
        })
        FireDocument.appendDocument(subPath, store, this)
      } catch (e) {
      }
    }

  }

}