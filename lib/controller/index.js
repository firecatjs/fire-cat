"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatController = void 0;
var FireCatController = (function () {
    function FireCatController() {
    }
    FireCatController.prototype.decoratorBindRouter = function (router, subPath, context) {
        try {
            var list = this['decoratorList'];
            list.forEach(function (item) {
                router[item.method](subPath + item.path, item.controller.bind(context));
            });
        }
        catch (e) {
        }
    };
    return FireCatController;
}());
exports.FireCatController = FireCatController;
