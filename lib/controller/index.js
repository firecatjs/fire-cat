"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatController = void 0;
var tslib_1 = require("tslib");
var decorator_1 = require("../decorator");
require("reflect-metadata");
var document_1 = require("../document");
var common_1 = require("../utils/common");
var FireCatController = (function () {
    function FireCatController() {
    }
    FireCatController.prototype.decoratorBindRouter = function (router, subPath, context) {
        var store = (0, decorator_1.getDecoratorRepositoryController)(this);
        if (store) {
            try {
                var list = store.getRoutes();
                var docDesList_1 = store.getDocDeses();
                list.forEach(function (item) {
                    var ins = store.getMiddlewares(item.propertyKey);
                    var concatPath = subPath + item.path;
                    router[item.method].apply(router, tslib_1.__spreadArray(tslib_1.__spreadArray([(0, common_1.fixedEndPath)(concatPath)], ins.map(function (i) { return i.controller.bind(context); }), false), [item.controller.bind(context)], false));
                    docDesList_1.forEach(function (docItem) {
                        if (docItem.propertyKey == item.propertyKey) {
                            item.description = docItem.description;
                        }
                    });
                });
                document_1.FireDocument.appendDocument(subPath, store, this);
            }
            catch (e) {
            }
        }
    };
    return FireCatController;
}());
exports.FireCatController = FireCatController;
