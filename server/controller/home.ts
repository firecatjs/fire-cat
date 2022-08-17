import {ApiDescription, FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";

export default class HomeController extends FireCatController {

  @Request()
  @ApiDescription('首页')
  @Get('')
  async index (ctx: Context) {
    ctx.body = 'hello world'
  }

  @Request()
  @ApiDescription('查找页面')
  @Get('find')
  async hello (ctx: Context) {
    ctx.body = 'find world'
  }

  @Request()
  @Get('error')
  @ApiDescription('报错页面')
  async error (ctx: Context) {
    const g: any = ''
    g.toFixed(2)
    ctx.body = 'hello world'
  }

  @Request()
  @Get('about')
  @ApiDescription('关于页面')
  async about (ctx: Context) {
    ctx.body = 'about page'
  }

}