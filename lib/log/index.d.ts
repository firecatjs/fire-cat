import * as log4js from 'log4js';
import { Context } from "../types";
import { Configuration } from "log4js";
interface FireCatLogConfig {
    filename?: string;
    pm2?: boolean;
}
export declare class FireCatLog {
    log: log4js.Logger;
    static defaultConfig(props: FireCatLogConfig): Configuration;
    constructor(props: Configuration);
    action(): any;
    loggerAction(ctx: Context, next: Function): Promise<void>;
    logError(ctx: any, error?: Error): void;
}
export {};
