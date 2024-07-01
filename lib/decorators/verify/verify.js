"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatVerify = void 0;
exports.FireCatVerifyWrap = FireCatVerifyWrap;
var tslib_1 = require("tslib");
var decorator_1 = require("../../decorator");
var fastValidator_1 = require("./fastValidator");
var types_1 = require("../../types");
function FireCatVerifyWrap(wrap) {
    return function CatVerify(jsonRule) {
        var _this = this;
        return decorator_1.FireCatDecorator.registerInterceptor(function (ctx, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var bodyData, errors;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bodyData = ctx.method == 'GET' ? ctx.request.query : (ctx.request.body || {});
                        errors = (0, fastValidator_1.fastValidator)(bodyData, jsonRule.v);
                        return [4, wrap(errors, ctx, next)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); }, types_1.InterceptorType.RULE, jsonRule.jsonRule);
    };
}
exports.FireCatVerify = FireCatVerifyWrap(function (message, ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!message) return [3, 1];
                ctx.body = message.message;
                return [3, 3];
            case 1: return [4, next()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2];
        }
    });
}); });
