import { Context } from "../types";
export default class DecoratorRouter {
    name: string;
    controller: (ctx: Context, next: Function) => void;
    method: string;
    constructor(name: string, controller: (ctx: Context, next: Function) => void, method: string);
}
