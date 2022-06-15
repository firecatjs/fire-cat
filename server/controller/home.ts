import {FireCatController, Get, Request} from "../../src";
import {Context} from "../../src/types";

export default class HomeController extends FireCatController {

  // constructor() {
  //   super();
  //
  //   console.log(this.getInterceptor, '=====')
  // }


  @Request()
  @Get('')
  async hello (ctx: Context) {
    ctx.body = 'hello world'
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