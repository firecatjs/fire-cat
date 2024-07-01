"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.All = exports.Put = exports.Update = exports.Head = exports.Del = exports.Post = exports.Get = void 0;
var tslib_1 = require("tslib");
var decorator_1 = require("../../decorator");
var types_1 = require("../../types");
function registerRouterPut(target, propertyKey, decorator, path, method) {
    try {
        var store = (0, decorator_1.getDecoratorRepositoryController)(target);
        if (store) {
            store.addRoute(decorator, path, method, propertyKey);
        }
    }
    catch (e) {
    }
}
function Get(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'get');
    });
}
exports.Get = Get;
function Post(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'post');
    });
}
exports.Post = Post;
function Del(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'del');
    });
}
exports.Del = Del;
function Head(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'head');
    });
}
exports.Head = Head;
function Update(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'update');
    });
}
exports.Update = Update;
function Put(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'put');
    });
}
exports.Put = Put;
function All(path) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey, decorator) {
        registerRouterPut(target, propertyKey, decorator, path, 'all');
    });
}
exports.All = All;
function Request() {
    var _this = this;
    return decorator_1.FireCatDecorator.registerInterceptor(function (ctx, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (ctx.method == 'GET') {
                        ctx.request.body = tslib_1.__assign({}, (ctx.request.query || {}));
                    }
                    else {
                        ctx.request.body = ctx.request.body || {};
                    }
                    return [4, next()];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }); }, types_1.InterceptorType.WRAP);
}
exports.Request = Request;
