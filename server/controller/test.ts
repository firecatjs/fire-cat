import {ApiDescription, FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";
import schema from './test.schema'
import {FireCatVerify} from "../../src";

export default class TestController extends FireCatController {

  @Get('news')
  @Request()
  @ApiDescription('新闻页面')
  async hello2 (ctx: Context) {
    ctx.body = 'news list'
  }

  @Get('show')
  @Request()
  @ApiDescription('验证展示页面')
  @FireCatVerify(schema.show)
  async show (ctx: Context) {
    ctx.body = 'your name is ' + ctx.request.body.name
  }

}