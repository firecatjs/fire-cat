"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorRepositoryController = exports.FireCatDecorator = exports.FireDecoratorController = exports.DecoratorRepository = void 0;
var fireKeys_1 = require("../config/fireKeys");
var types_1 = require("../types");
require("reflect-metadata");
var store_1 = require("../store");
var DecoratorRepository = (function () {
    function DecoratorRepository() {
        this.routers = [];
        this.docDeses = [];
        this.middlewares = {};
        this.interceptors = [];
    }
    DecoratorRepository.prototype.addInterceptor = function (interceptor) {
        this.interceptors.push(interceptor);
    };
    DecoratorRepository.prototype.addRoute = function (decorator, path, method, propertyKey) {
        var betterPath = path;
        if (!/^\//.test(betterPath)) {
            betterPath = '/' + betterPath;
        }
        this.routers.push({
            path: betterPath,
            controller: decorator.value,
            method: method,
            propertyKey: propertyKey
        });
    };
    DecoratorRepository.prototype.addMiddleware = function (propertyKey, middleware) {
        if (!this.middlewares[propertyKey]) {
            this.middlewares[propertyKey] = [];
        }
        this.middlewares[propertyKey].push(middleware);
    };
    DecoratorRepository.prototype.addDocDeses = function (doc) {
        this.docDeses.push(doc);
    };
    DecoratorRepository.prototype.getDocDeses = function () {
        return this.docDeses;
    };
    DecoratorRepository.prototype.getInterceptors = function () {
        return this.interceptors;
    };
    DecoratorRepository.prototype.getRoutes = function () {
        return this.routers;
    };
    DecoratorRepository.prototype.getMiddlewares = function (propertyKey) {
        return this.middlewares[propertyKey] || [];
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
exports.FireDecoratorController = FireDecoratorController;
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
exports.getDecoratorRepositoryController = getDecoratorRepositoryController;
