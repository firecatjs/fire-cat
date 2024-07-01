import * as Router from 'koa-router';
import {getDecoratorRepositoryController} from "../decorator";
import 'reflect-metadata'
import {FireDocument} from "../document";
import {fixedEndPath} from "../utils/common";
import { KoaMiddleware } from '../../src/types';

export class FireCatController {

  // 绑定构造的router
  public decoratorBindRouter(router: Router, subPath: string, context: any, middlewares: KoaMiddleware[] = []) {

    const store = getDecoratorRepositoryController(this)

    if (store) {
      try {
        const list = store.getRoutes()
        const docDesList = store.getDocDeses()
        
        list.forEach(item => {

          const ins = store.getMiddlewares(item.propertyKey)

          const concatPath = subPath + item.path

          // replace end "/" of path
          router[item.method](
            fixedEndPath(concatPath), 
            ...[
              ...middlewares,
              ...ins.map(i => i.controller.bind(context))
            ], 
            item.controller.bind(context)
          )

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