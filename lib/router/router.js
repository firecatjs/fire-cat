"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatRouter = void 0;
var Router = require("koa-router");
var group_1 = require("../router/group");
var FireCatRouter = (function () {
    function FireCatRouter() {
        this.router = new Router();
    }
    FireCatRouter.prototype.group = function (path, callback) {
        callback(new group_1.default(this.router, path));
    };
    FireCatRouter.prototype.controller = function (path, control) {
        control.decoratorBindRouter(this.router, path, control);
    };
    return FireCatRouter;
}());
exports.FireCatRouter = FireCatRouter;
