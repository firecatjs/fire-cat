"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.All = exports.Put = exports.Update = exports.Head = exports.Del = exports.Post = exports.Get = void 0;
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
    return decorator_1.FireCatDecorator.registerInterceptor(function (ctx, next) {
        if (ctx.method == 'GET') {
            ctx.request.body = __assign({}, ctx.request.query);
        }
        next();
    }, types_1.InterceptorType.WRAP);
}
exports.Request = Request;
