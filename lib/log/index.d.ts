import { Context } from "../types";
export declare class FireCatLog {
    private log;
    constructor();
    action(): any;
    loggerAction(ctx: Context, next: Function): Promise<void>;
    loggerError(ctx: Context, next: Function): Promise<void>;
    error(): any;
}
