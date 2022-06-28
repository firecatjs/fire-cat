"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Post = exports.Get = void 0;
var decorator_1 = require("../../decorator");
var types_1 = require("../../types");
function registerRouterPut(target, propertyKey, decorator, path, method) {
    try {
        var store = (0, decorator_1.getDecoratorStoreMetaControllerData)(target);
        if (store) {
            store.appendRouter(decorator, path, method, propertyKey);
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
function Request() {
    return decorator_1.FireCatDecorator.registerInterceptor(function (ctx, next) {
        if (ctx.method == 'GET') {
            ctx.request.body = ctx.request.query;
        }
        next();
    }, types_1.InterceptorType.WRAP);
}
exports.Request = Request;
