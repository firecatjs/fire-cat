import {ApiDescription, FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";
import schema from './test.schema'
import {FireCatVerify} from "../../src";

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