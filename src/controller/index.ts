import * as Router from 'koa-router';
import {getDecoratorStoreMetaControllerData, getDecoratorStoreMetaData} from "../decorator";
import 'reflect-metadata'

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
      } catch (e) {
      }
    }

  }

}