import {FireCatDecorator, getDecoratorStoreMetaControllerData} from "../../decorator";

export function ApiDescription (des: string) {
  return FireCatDecorator.registerImplement((target, propertyKey)=> {
    const store = getDecoratorStoreMetaControllerData(target)
    if (store) {
      store.appendDocDes({
        propertyKey,
        description: des
      })
    }
  })
}