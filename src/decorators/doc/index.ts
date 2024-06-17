import {FireCatDecorator, getDecoratorRepositoryController} from "../../decorator";

export function ApiDescription (des: string) {
  return FireCatDecorator.registerImplement((target, propertyKey)=> {
    const store = getDecoratorRepositoryController(target)
    if (store) {
      store.addDocDeses({
        propertyKey,
        description: des
      })
    }
  })
}