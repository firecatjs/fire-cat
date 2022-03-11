import {FireCatRouter} from "../src";
import HomeController from "./controller/home";

export const fireCatRouter = new FireCatRouter()

fireCatRouter.controller('', new HomeController())