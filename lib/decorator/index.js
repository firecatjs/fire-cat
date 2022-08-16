"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecoratorStoreMetaData = exports.setDecoratorStoreMetaData = exports.getDecoratorStoreMetaControllerData = exports.setDecoratorStoreMetaControllerData = exports.DecoratorStore = exports.DecoratorControllerStore = exports.FireCatDecorator = void 0;
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
    }
    DecoratorControllerStore.prototype.getRouterArray = function () {
        return this.routerArray;
    };
    DecoratorControllerStore.prototype.appendRouter = function (decorator, path, method, propertyKey) {
        this.routerArray.push({
            path: path ? ('/' + path) : path,
            controller: decorator.value,
            method: method,
            propertyKey: propertyKey
        });
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
                return __awaiter(this, void 0, void 0, function () {
                    var isNext, index, fn, e_1;
                    return __generator(this, function (_a) {
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
