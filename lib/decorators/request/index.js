"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.Post = exports.Get = void 0;
var decorator_1 = require("../../decorator");
function registerRouterPut(target, decorator, path, method) {
    try {
        target.decoratorList = target.decoratorList || [];
        target.decoratorList.push({
            path: path ? ('/' + path) : path,
            controller: decorator.value,
            method: method
        });
    }
    catch (e) {
    }
}
function Get(path) {
    return decorator_1.FireCatDecorator.register({
        before: function (target, key, decorator) {
            registerRouterPut(target, decorator, path, 'get');
        }
    });
}
exports.Get = Get;
function Post(path) {
    return decorator_1.FireCatDecorator.register({
        before: function (target, key, decorator) {
            registerRouterPut(target, decorator, path, 'post');
        }
    });
}
exports.Post = Post;
function Request() {
    return decorator_1.FireCatDecorator.register({
        wrap: function (ctx, next) {
            if (ctx.method == 'GET') {
                ctx.request.body = ctx.request.query;
            }
            next();
        }
    });
}
exports.Request = Request;
