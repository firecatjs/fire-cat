"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatDecorator = exports.DecoratorRepository = void 0;
exports.FireDecoratorController = FireDecoratorController;
exports.getDecoratorRepositoryController = getDecoratorRepositoryController;
var tslib_1 = require("tslib");
var fireKeys_1 = require("../config/fireKeys");
var types_1 = require("../types");
require("reflect-metadata");
var store_1 = require("../store");
var DecoratorRepository = (function () {
    function DecoratorRepository() {
        this.routes = [];
        this.docDescriptions = new Map();
        this.middlewares = {};
    }
    DecoratorRepository.prototype.addRoute = function (handler, path, method, propertyKey) {
        var betterPath = /^\//.test(path) ? path : "/".concat(path);
        this.routes.push({
            path: betterPath,
            controller: handler,
            method: method,
            propertyKey: propertyKey
        });
    };
    DecoratorRepository.prototype.addMiddleware = function (propertyKey, middleware) {
        if (!this.middlewares[propertyKey]) {
            this.middlewares[propertyKey] = [];
        }
        this.middlewares[propertyKey].unshift(middleware);
    };
    DecoratorRepository.prototype.addDocDeses = function (doc) {
        this.docDescriptions.set(doc.propertyKey, doc.description);
    };
    DecoratorRepository.prototype.getDocDeses = function () {
        return Array.from(this.docDescriptions.entries()).map(function (_a) {
            var propertyKey = _a[0], description = _a[1];
            return ({
                propertyKey: propertyKey,
                description: description
            });
        });
    };
    DecoratorRepository.prototype.getRoutes = function () {
        var _this = this;
        return this.routes.map(function (route) { return (tslib_1.__assign(tslib_1.__assign({}, route), { description: _this.docDescriptions.get(route.propertyKey) })); });
    };
    DecoratorRepository.prototype.getMiddlewares = function (propertyKey) {
        return this.middlewares[propertyKey] || [];
    };
    DecoratorRepository.prototype.getRouteDefinitions = function () {
        var _this = this;
        return this.getRoutes().map(function (route) { return ({
            method: route.method,
            path: route.path,
            propertyKey: route.propertyKey,
            handler: route.controller,
            description: route.description,
            middlewares: _this.getMiddlewares(route.propertyKey)
        }); });
    };
    return DecoratorRepository;
}());
exports.DecoratorRepository = DecoratorRepository;
function FireDecoratorController() {
    return function (constructor) {
        var repository = new DecoratorRepository();
        Reflect.defineMetadata(fireKeys_1.FIRE_REPOSITORY_METADATA_KEY, repository, constructor.prototype);
    };
}
var FireCatDecorator = (function () {
    function FireCatDecorator() {
    }
    FireCatDecorator.registerInterceptor = function (interceptor, type, data) {
        if (type === void 0) { type = types_1.InterceptorType.WRAP; }
        return function (target, propertyKey, descriptor) {
            store_1.FireStore.check(target.constructor);
            var repository = getDecoratorRepositoryController(target);
            repository.addMiddleware(propertyKey, {
                controller: interceptor,
                propertyKey: propertyKey,
                type: type,
                data: data
            });
        };
    };
    FireCatDecorator.registerImplement = function (implement) {
        return function (target, propertyKey, descriptor) {
            store_1.FireStore.check(target.constructor);
            if (typeof implement == 'function') {
                implement(target, propertyKey, descriptor);
            }
        };
    };
    return FireCatDecorator;
}());
exports.FireCatDecorator = FireCatDecorator;
function getDecoratorRepositoryController(target) {
    return store_1.FireStore.getDecoratorRepository(target.constructor);
}
