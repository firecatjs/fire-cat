"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatController = void 0;
var tslib_1 = require("tslib");
var decorator_1 = require("../decorator");
require("reflect-metadata");
var common_1 = require("../utils/common");
var FireCatController = (function () {
    function FireCatController() {
    }
    FireCatController.prototype.getRouteDefinitions = function () {
        var store = (0, decorator_1.getDecoratorRepositoryController)(this);
        if (!store) {
            return [];
        }
        return store.getRouteDefinitions();
    };
    FireCatController.prototype.decoratorBindRouter = function (router, subPath, context, middlewares) {
        if (middlewares === void 0) { middlewares = []; }
        var definitions = this.getRouteDefinitions().map(function (definition) { return (tslib_1.__assign(tslib_1.__assign({}, definition), { path: (0, common_1.fixedEndPath)((0, common_1.joinRoutePaths)(subPath, definition.path)) })); });
        definitions.forEach(function (definition) {
            var routeMiddlewares = definition.middlewares.map(function (item) { return item.controller.bind(context); });
            router[definition.method].apply(router, tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([definition.path], middlewares, false), routeMiddlewares, false), [definition.handler.bind(context)], false));
        });
        return definitions;
    };
    return FireCatController;
}());
exports.FireCatController = FireCatController;
