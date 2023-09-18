import {ApiDescription, FireCatController, Get, Request, Context} from "../../src";

export default class BannerController extends FireCatController {

  @Get('/')
  @Request()
  @ApiDescription('entry')
  async index (ctx: Context) {
    ctx.body = 'banner index'
  }

  @Get('/list')
  @Request()
  @ApiDescription('新闻页面')
  async list (ctx: Context) {
    ctx.body = 'banner list'
  }

}