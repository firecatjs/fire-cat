import {FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";
import schema from './test.schema'
import {FireCatVerify} from "../../src";

export default class TestController extends FireCatController {

  @Request()
  @Get('news')
  async hello2 (ctx: Context) {
    ctx.body = 'news list'
  }

  @Request()
  @Get('show')
  @FireCatVerify(schema.show)
  async show (ctx: Context) {
    ctx.body = 'your name is ' + ctx.request.body.name
  }

}