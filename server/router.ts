import {FireCatRouter} from "../src";
import HomeController from "./controller/home";
import TestController from "./controller/test";
import BannerController from "./controller/banner";

export const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('/', new HomeController())

fireCatRouter.group('/api/v1', (v1)=> {
  v1.group('/admin', (admin) => {
    admin.controller('/banner', new BannerController())
  })
})

// fireCatRouter.group('/', (v1)=> {
//   v1.group('/admin', (admin) => {
//     admin.controller('/banner', new BannerController())
//   })
// })

fireCatRouter.controller('/test', new TestController())