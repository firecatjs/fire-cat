import * as Router from 'koa-router';
import {getDecoratorStoreMetaControllerData} from "../decorator";
import 'reflect-metadata'
import {FireDocument} from "../document";
import {fixedEndPath} from "../utils/common";

export class FireCatController {

  // 绑定构造的router
  public decoratorBindRouter(router: Router, subPath: string, context: any) {

    const store = getDecoratorStoreMetaControllerData(this)

    if (store) {
      try {
        const list = store.getRouterArray()
        const docDesList = store.getDocDesArray()
        list.forEach(item => {

          const concatPath = subPath + item.path

          // replace end "/" of path
          router[item.method](fixedEndPath(concatPath), item.controller.bind(context))

          docDesList.forEach(docItem => {
            if (docItem.propertyKey == item.propertyKey) {
              item.description = docItem.description
            }
          })
        })
        FireDocument.appendDocument(subPath, store, this)
      } catch (e) {
      }
    }

  }

}