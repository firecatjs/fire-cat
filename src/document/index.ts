// 接口文档服务
import {FireDocumentHeadInterFace, FireDocumentInterFace, FireDocumentStoreInterFace, InterceptorType} from "../types";
import {DecoratorControllerStore, getDecoratorStoreMetaData} from "../decorator";
import {FireCatRouter} from "../router/router";
import {fixedEndPath} from "../utils/common";

export class FireDocument {
  static documents: FireDocumentStoreInterFace[] = [];

  static appendDocument(path: string, context: DecoratorControllerStore, target: any) {
    FireDocument.documents.push({
      path,
      target,
      context
    })
  }

  static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace) {
    router.router.get(path, (ctx, next)=> {

      const doc: FireDocumentInterFace = {
        title: config.title,
        description: config.description,
        date: config.date,
        version: config.version,
        body: [],
      }

      FireDocument.documents.forEach(item => {
        const children = item.context.getRouterArray()

        children.forEach(item2 => {

          const mission = {
            path: item.path + item2.path,
            methods: item2.method,
            rule: [],
            description: item2.description,
          }

          if (!mission.path) {
            mission.path = '/'
          } else {
            mission.path = fixedEndPath(mission.path)
          }

          const methodStore = getDecoratorStoreMetaData(item.target, item2.propertyKey)

          if (methodStore) {
            const inter = methodStore.getInterceptor()

            inter.forEach(intItem => {
              if (intItem.type == InterceptorType.RULE) {
                mission.rule.push(intItem.data)
              }
            })
          }

          doc.body.push(mission)
        })

      })
      ctx.body = doc
    })
  }
}