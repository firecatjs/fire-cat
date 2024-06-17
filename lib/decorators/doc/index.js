"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDescription = void 0;
var decorator_1 = require("../../decorator");
function ApiDescription(des) {
    return decorator_1.FireCatDecorator.registerImplement(function (target, propertyKey) {
        var store = (0, decorator_1.getDecoratorRepositoryController)(target);
        if (store) {
            store.addDocDeses({
                propertyKey: propertyKey,
                description: des
            });
        }
    });
}
exports.ApiDescription = ApiDescription;
