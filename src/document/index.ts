// 接口文档服务
import {FireDocumentHeadInterFace, FireDocumentInterFace, FireDocumentStoreInterFace, InterceptorType} from "../types";
import {FireCatRouter} from "../router/router";
import {fixedEndPath} from "../utils/common";

export class FireDocument {
  static documents: FireDocumentStoreInterFace[] = [];

  static appendDocument(path: string, routes: FireDocumentStoreInterFace['routes']) {
    FireDocument.documents.push({
      path,
      routes
    });
  }

  static server(router: FireCatRouter, path: string, config: FireDocumentHeadInterFace) {
    router.router.get(path, (ctx)=> {

      const doc: FireDocumentInterFace = {
        title: config.title,
        description: config.description,
        date: config.date,
        version: config.version,
        body: [],
      }

      router.getDocumentStore().forEach(item => {
        item.routes.forEach(route => {
          const mission = {
            path: fixedEndPath(route.path || item.path),
            methods: route.method,
            rule: [],
            description: route.description,
          };

          route.middlewares.forEach(intItem => {
              if (intItem.type == InterceptorType.RULE) {
                mission.rule.push(intItem.data);
              }
          });

          doc.body.push(mission);
        });
      });
      ctx.body = doc;
    });
  }
}
