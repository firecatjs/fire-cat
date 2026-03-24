"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patch = exports.Delete = void 0;
exports.Get = Get;
exports.Post = Post;
exports.Del = Del;
exports.Head = Head;
exports.Update = Update;
exports.Put = Put;
exports.All = All;
exports.Request = Request;
var tslib_1 = require("tslib");
var decorator_1 = require("../../decorator");
var types_1 = require("../../types");
function registerRouterPut(target, propertyKey, descriptor, path, method) {
    var store = (0, decorator_1.getDecoratorRepositoryController)(target);
    if (store) {
        store.addRoute(descriptor.value, path, method, propertyKey);
    }
}
function Get(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'get');
    });
}
function Post(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'post');
    });
}
function Del(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'del');
    });
}
exports.Delete = Del;
function Head(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'head');
    });
}
function Update(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'patch');
    });
}
exports.Patch = Update;
function Put(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'put');
    });
}
function All(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'all');
    });
}
function Request() {
    var _this = this;
    return decorator_1.FireCatDecorator.registerInterceptor(function (ctx, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var query, body;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = ctx.request.query || {};
                    body = ctx.request.body || {};
                    ctx.request.body = ctx.method === 'GET'
                        ? tslib_1.__assign({}, query) : tslib_1.__assign(tslib_1.__assign({}, query), body);
                    return [4, next()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); }, types_1.InterceptorType.WRAP);
}
