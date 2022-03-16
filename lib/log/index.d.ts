import * as log4js from 'log4js';
import { Context } from "../types";
interface FireCatLogConfig {
    filename?: string;
}
export declare class FireCatLog {
    log: log4js.Logger;
    constructor(props: FireCatLogConfig);
    action(): any;
    loggerAction(ctx: Context, next: Function): Promise<void>;
    logError(ctx: any): void;
}
export {};
