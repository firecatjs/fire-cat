"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatLog = void 0;
var tslib_1 = require("tslib");
var log4js = require("log4js");
var FireCatLog = (function () {
    function FireCatLog(props) {
        log4js.configure(props);
        this.log = log4js.getLogger();
    }
    FireCatLog.defaultConfig = function (props) {
        return {
            pm2: props.pm2,
            appenders: {
                cheese: {
                    type: 'dateFile',
                    filename: props.filename || 'logs/app.log',
                    encoding: 'utf-8',
                    layout: {
                        type: "pattern",
                        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
                    },
                    pattern: "yyyy-MM-dd",
                    keepFileExt: true,
                    alwaysIncludePattern: true,
                },
            },
            categories: {
                default: { appenders: ['cheese'], level: 'debug' },
            }
        };
    };
    FireCatLog.prototype.action = function () {
        return this.loggerAction.bind(this);
    };
    FireCatLog.prototype.loggerAction = function (ctx, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, next()];
                    case 1:
                        _a.sent();
                        this.log.debug({
                            url: ctx.url,
                            status: ctx.status,
                            ip: ctx.ip,
                            queryString: ctx.querystring,
                            body: ctx.body,
                        });
                        return [2];
                }
            });
        });
    };
    FireCatLog.prototype.logError = function (ctx, error) {
        this.log.debug({
            url: ctx.url,
            status: ctx.status,
            ip: ctx.ip,
            queryString: ctx.querystring,
            body: ctx.body,
            error: error
        });
    };
    return FireCatLog;
}());
exports.FireCatLog = FireCatLog;
