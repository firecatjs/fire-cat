import * as Router from '@koa/router';
import {getDecoratorRepositoryController} from "../decorator";
import 'reflect-metadata'
import {fixedEndPath, joinRoutePaths} from "../utils/common";
import {FireRouteDefinition, KoaMiddleware} from '../types';

export class FireCatController {

  public getRouteDefinitions(): FireRouteDefinition[] {
    const store = getDecoratorRepositoryController(this);
    if (!store) {
      return [];
    }

    return store.getRouteDefinitions();
  }

  // 绑定构造的router
  public decoratorBindRouter(
    router: Router,
    subPath: string,
    context: any,
    middlewares: KoaMiddleware[] = []
  ): FireRouteDefinition[] {
    const definitions = this.getRouteDefinitions().map(definition => ({
      ...definition,
      path: fixedEndPath(joinRoutePaths(subPath, definition.path))
    }));

    definitions.forEach(definition => {
      const routeMiddlewares = definition.middlewares.map(item => item.controller.bind(context));
      router[definition.method](
        definition.path,
        ...middlewares,
        ...routeMiddlewares,
        definition.handler.bind(context)
      );
    });

    return definitions;
  }

}
