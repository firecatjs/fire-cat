import * as Router from 'koa-router';

export class FireCatController {
  // 绑定构造的router
  public decoratorBindRouter(router: Router, subPath: string, context: any) {
    try {
      const list = this['decoratorList']
      list.forEach(item => {
        router[item.method](subPath + item.path, item.controller.bind(context))
      })
    } catch (e) {
    }
  }
}