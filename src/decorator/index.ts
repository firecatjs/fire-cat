import {Context} from "../types";
import FireCat from "../fire";

export class FireCatDecorator {

  static register(props: {
    wrap?: (ctx: Context, next: Function, decorator: {target: any, propertyKey: string, descriptor: PropertyDescriptor}) => void,
    before?: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void
  }) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const original = descriptor.value;

      // 对未注册的
      const saveKey = 'fn_' + propertyKey + '_save'

      if (!target[saveKey]) {
        // 注册事件数组
        target[saveKey] = []

        if (props.wrap) {
          target[saveKey] = [props.wrap]
        }

      } else {
        if (props.wrap) {
          target[saveKey].unshift(props.wrap)
        }
      }

      const regArray = target[saveKey]
      // 修改原函数
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
              // err
              FireCat.onServerError(ctx, e)
            }
          }
        }
      }

      if (props.before) {
        props.before(target, propertyKey, descriptor)
      }

      return descriptor
    }
  }
}