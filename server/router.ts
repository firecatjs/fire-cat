import {FireCatRouter} from "../src";
import HomeController from "./controller/home";
import TestController from "./controller/test";

export const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('', new HomeController())
fireCatRouter.controller('/test', new TestController())