"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DecoratorRouter = (function () {
    function DecoratorRouter(name, controller, method) {
        this.name = name;
        this.controller = controller;
        this.method = method;
    }
    return DecoratorRouter;
}());
exports.default = DecoratorRouter;
