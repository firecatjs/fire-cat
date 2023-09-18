"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorStoreMetaData = exports.setDecoratorStoreMetaData = exports.getDecoratorStoreMetaControllerData = exports.setDecoratorStoreMetaControllerData = exports.DecoratorStore = exports.DecoratorControllerStore = exports.FireCatDecorator = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../types");
require("reflect-metadata");
var DecoratorControllerNameSpace = 'decorator_controller';
var DecoratorStoreNameSpace = 'decorator_store';
var FireCatDecorator = (function () {
    function FireCatDecorator() {
    }
    FireCatDecorator.registerInterceptor = function (interceptor, type, data) {
        if (type === void 0) { type = types_1.InterceptorType.WRAP; }
        return function (target, propertyKey, descriptor) {
            var store = getDecoratorStoreMetaData(target, propertyKey);
            if (!store) {
                setDecoratorStoreMetaData(store = new DecoratorStore(), target, propertyKey);
            }
            if (store) {
                if (!store.isInit) {
                    store.initializationAction(target, propertyKey, descriptor);
                }
            }
            if (interceptor) {
                store.appendInterceptor({
                    controller: interceptor,
                    propertyKey: propertyKey,
                    type: type,
                    data: data
                });
            }
            return descriptor;
        };
    };
    FireCatDecorator.registerImplement = function (implement) {
        return function (target, propertyKey, descriptor) {
            var store = getDecoratorStoreMetaControllerData(target);
            if (!store) {
                setDecoratorStoreMetaControllerData(new DecoratorControllerStore(), target);
            }
            if (typeof implement == 'function') {
                implement(target, propertyKey, descriptor);
            }
        };
    };
    return FireCatDecorator;
}());
exports.FireCatDecorator = FireCatDecorator;
var DecoratorControllerStore = (function () {
    function DecoratorControllerStore() {
        this.routerArray = [];
        this.docDesArray = [];
    }
    DecoratorControllerStore.prototype.getRouterArray = function () {
        return this.routerArray;
    };
    DecoratorControllerStore.prototype.appendRouter = function (decorator, path, method, propertyKey) {
        var betterPath = path;
        if (!/^\//.test(betterPath)) {
            betterPath = '/' + betterPath;
        }
        this.routerArray.push({
            path: betterPath,
            controller: decorator.value,
            method: method,
            propertyKey: propertyKey
        });
    };
    DecoratorControllerStore.prototype.getDocDesArray = function () {
        return this.docDesArray;
    };
    DecoratorControllerStore.prototype.appendDocDes = function (doc) {
        this.docDesArray.push(doc);
    };
    return DecoratorControllerStore;
}());
exports.DecoratorControllerStore = DecoratorControllerStore;
var DecoratorStore = (function () {
    function DecoratorStore() {
        this.isInit = false;
        this.interceptorArray = [];
    }
    DecoratorStore.prototype.appendInterceptor = function (wrap) {
        this.interceptorArray.unshift(wrap);
    };
    DecoratorStore.prototype.getInterceptor = function () {
        return this.interceptorArray;
    };
    DecoratorStore.prototype.initializationAction = function (target, propertyKey, descriptor) {
        this.isInit = true;
        var original = descriptor.value;
        var regArray = this.interceptorArray;
        if (typeof original === 'function') {
            descriptor.value = function (ctx, next) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var isNext, index, fn, e_1;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                isNext = true;
                                index = 0;
                                _a.label = 1;
                            case 1:
                                if (!isNext) return [3, 4];
                                fn = regArray[index];
                                if (index < regArray.length) {
                                    index++;
                                }
                                else {
                                    return [3, 4];
                                }
                                isNext = false;
                                if (!fn) return [3, 3];
                                return [4, fn.controller(ctx, function () {
                                        isNext = true;
                                    }, {
                                        target: target,
                                        propertyKey: propertyKey,
                                        descriptor: descriptor
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [3, 1];
                            case 4:
                                if (!isNext) return [3, 8];
                                _a.label = 5;
                            case 5:
                                _a.trys.push([5, 7, , 8]);
                                return [4, original.call(this, ctx, next)];
                            case 6:
                                _a.sent();
                                return [3, 8];
                            case 7:
                                e_1 = _a.sent();
                                throw e_1;
                            case 8: return [2];
                        }
                    });
                });
            };
        }
    };
    return DecoratorStore;
}());
exports.DecoratorStore = DecoratorStore;
function setMetaData(key, value, target, propertyKey) {
    Reflect.defineMetadata(key, value, target, propertyKey);
}
function getMetaData(key, target, propertyKey) {
    return Reflect.getMetadata(key, target, propertyKey);
}
function setDecoratorStoreMetaControllerData(value, target) {
    setMetaData(DecoratorControllerNameSpace, value, target);
}
exports.setDecoratorStoreMetaControllerData = setDecoratorStoreMetaControllerData;
function getDecoratorStoreMetaControllerData(target) {
    return getMetaData(DecoratorControllerNameSpace, target);
}
exports.getDecoratorStoreMetaControllerData = getDecoratorStoreMetaControllerData;
function setDecoratorStoreMetaData(value, target, propertyKey) {
    setMetaData(DecoratorStoreNameSpace, value, target, propertyKey);
}
exports.setDecoratorStoreMetaData = setDecoratorStoreMetaData;
function getDecoratorStoreMetaData(target, propertyKey) {
    return getMetaData(DecoratorStoreNameSpace, target, propertyKey);
}
exports.getDecoratorStoreMetaData = getDecoratorStoreMetaData;
