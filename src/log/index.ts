import * as log4js from 'log4js'
import {Context} from "../types";
import {Configuration} from "log4js";

interface FireCatLogConfig {
  filename?: string;
  pm2?: boolean;
}

export class FireCatLog {
  public log: log4js.Logger;

  static defaultConfig(props: FireCatLogConfig): Configuration {
    return {
      pm2: props.pm2,
      appenders: {
        cheese: {
          // 设置类型为 dateFile
          type: 'dateFile',
          // 配置文件名为 test.log
          filename: props.filename || 'logs/app.log',
          // 指定编码格式为 utf-8
          encoding: 'utf-8',
          // 配置 layout，此处使用自定义模式 pattern
          layout: {
            type: "pattern",
            // 配置模式，下面会有介绍
            pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
          },
          // 日志文件按日期（天）切割
          pattern: "yyyy-MM-dd",
          // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
          keepFileExt: true,
          // 输出的日志文件名是都始终包含 pattern 日期结尾
          alwaysIncludePattern: true,
        },
      },
      categories: {
        // 设置默认的 categories
        default: {appenders: ['cheese'], level: 'debug'},
      }
    }
  }

  constructor(props: Configuration) {
    log4js.configure(props)
    this.log = log4js.getLogger();
  }

  action() {
    return this.loggerAction.bind(this)
  }

  async loggerAction(ctx: Context, next: Function) {
    await next()
    this.log.debug({
      url: ctx.url,
      status: ctx.status,
      ip: ctx.ip,
      queryString: ctx.querystring,
      body: ctx.body,
    });
  }

  logError(ctx, error?: Error) {
    this.log.debug({
      url: ctx.url,
      status: ctx.status,
      ip: ctx.ip,
      // query: ctx.query,
      queryString: ctx.querystring,
      body: ctx.body,
      error
    });
  }
}