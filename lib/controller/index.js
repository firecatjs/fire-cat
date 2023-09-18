"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatController = void 0;
var decorator_1 = require("../decorator");
require("reflect-metadata");
var document_1 = require("../document");
var common_1 = require("../utils/common");
var FireCatController = (function () {
    function FireCatController() {
    }
    FireCatController.prototype.decoratorBindRouter = function (router, subPath, context) {
        var store = (0, decorator_1.getDecoratorStoreMetaControllerData)(this);
        if (store) {
            try {
                var list = store.getRouterArray();
                var docDesList_1 = store.getDocDesArray();
                list.forEach(function (item) {
                    var concatPath = subPath + item.path;
                    router[item.method]((0, common_1.fixedEndPath)(concatPath), item.controller.bind(context));
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
