// 寄存在controller里面的router实例
import {Context} from "../types";

export default class DecoratorRouter {
  public name: string;
  public controller: (ctx: Context, next: Function)=> void;
  public method: string;

  constructor(name: string, controller: (ctx: Context, next: Function)=> void, method: string) {
    this.name = name
    this.controller = controller
    this.method = method
  }
}