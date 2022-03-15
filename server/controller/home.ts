import {FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";

export default class HomeController extends FireCatController {

  @Request()
  @Get('')
  async hello (ctx: Context) {
    const f: any = ''

    f.toFixed(2)
    ctx.body = 'hello world'
  }

  @Request()
  @Get('about')
  async about (ctx: Context) {
    ctx.body = 'about page'
  }

}