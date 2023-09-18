import {ApiDescription, FireCatController, Get, Request, Context, FireCatVerify} from "../../src";
import schema from './test.schema'

export default class TestController extends FireCatController {

  @Get('/')
  @Request()
  @ApiDescription('entry')
  async hello3 (ctx: Context) {
    ctx.body = 'welcome'
  }

  @Get('news')
  @Request()
  @ApiDescription('新闻页面')
  async hello2 (ctx: Context) {
    ctx.body = 'news list'
  }

  @Get('/show')
  @Request()
  @ApiDescription('验证展示页面')
  @FireCatVerify(schema.show)
  async show (ctx: Context) {
    ctx.body = 'your name is ' + ctx.request.body.name
  }

}