import {FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";

export default class TestController extends FireCatController {

  @Request()
  @Get('news')
  async hello2 (ctx: Context) {
    ctx.body = 'news list'
  }

}