"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var FireCat = (function () {
    function FireCat(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.koa = new Koa(config.koaConfig);
        this.koa.use(bodyParser(config.bodyParserConfig));
        this.koa.use(function (ctx, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, next()];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        ctx.status = 500;
                        ctx.app.emit('error', err_1, ctx);
                        this.onError(ctx, err_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); });
    }
    FireCat.prototype.onError = function (ctx, err) {
    };
    return FireCat;
}());
exports.default = FireCat;
