import * as Router from 'koa-router';

export class FireCatController {
  // 注入拦截器储存
  private _cat_interceptor = {};

  public getInterceptorGroup(key: string): Function[] {
    return this._cat_interceptor[key]
  }

  public insertInterceptor(target: string, propertyKey) {
    console.log(this, '----- ===== 333333')

    Reflect.defineMetadata('classMetaData', 'a', target)

    // console.log(this._cat_interceptor, '----- ===== 333333')
    // this._cat_interceptor[key] = this._cat_interceptor[key] || []
    // this._cat_interceptor[key].unshift(fun)
  }

  // 初始化函数
  public initializationAction(target, propertyKey, descriptor) {
    const original = descriptor.value;

    const regArray = this.getInterceptorGroup(propertyKey)

    if (typeof original === 'function') {

      descriptor.value = async function (ctx, next) {

        let isNext = true
        let index = 0

        while (isNext) {
          const fn = regArray[index]

          if (index < regArray.length) {
            index++
          } else {
            break
          }

          isNext = false

          if (fn) {
            await fn(ctx, ()=> {
              isNext = true
            }, {
              target,
              propertyKey,
              descriptor
            })
          }
        }

        if (isNext) {
          try {
            await original.call(this, ctx, next);
          } catch (e) {
            throw e
          }
        }
      }
    }
  }

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