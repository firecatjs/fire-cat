"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatController = void 0;
var decorator_1 = require("../decorator");
require("reflect-metadata");
var document_1 = require("../document");
var FireCatController = (function () {
    function FireCatController() {
    }
    FireCatController.prototype.decoratorBindRouter = function (router, subPath, context) {
        var store = (0, decorator_1.getDecoratorStoreMetaControllerData)(this);
        if (store) {
            try {
                var list = store.getRouterArray();
                list.forEach(function (item) {
                    router[item.method](subPath + item.path, item.controller.bind(context));
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
