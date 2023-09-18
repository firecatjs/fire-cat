import {ApiDescription, FireCatController, Get, Request, Context} from "../../src";

export default class HomeController extends FireCatController {

  @Get('/')
  @Request()
  @ApiDescription('首页')
  async index (ctx: Context) {
    ctx.body = 'hello world'
  }

  @Get('/find')
  @Request()
  @ApiDescription('查找页面')
  async hello (ctx: Context) {
    ctx.body = 'find world'
  }

  @Get('/error')
  @Request()
  @ApiDescription('报错页面')
  async error (ctx: Context) {
    const g: any = ''
    g.toFixed(2)
    ctx.body = 'hello world'
  }

  @Get('/about')
  @Request()
  @ApiDescription('关于页面')
  async about (ctx: Context) {
    ctx.body = 'about page'
  }

}