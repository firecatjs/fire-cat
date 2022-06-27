import {FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";

export default class HomeController extends FireCatController {

  @Request()
  @Get('')
  async index (ctx: Context) {
    ctx.body = 'hello world'
  }

  @Request()
  @Get('find')
  async hello (ctx: Context) {
    ctx.body = 'find world'
  }

  @Request()
  @Get('error')
  async error (ctx: Context) {
    const g: any = ''
    g.toFixed(2)
    ctx.body = 'hello world'
  }

  @Request()
  @Get('about')
  async about (ctx: Context) {
    ctx.body = 'about page'
  }

}