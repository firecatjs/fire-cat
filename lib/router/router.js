"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatRouter = void 0;
var Router = require("koa-router");
var group_1 = require("../router/group");
var document_1 = require("../document");
var common_1 = require("../utils/common");
var FireCatRouter = (function () {
    function FireCatRouter() {
        this.router = new Router();
    }
    FireCatRouter.prototype.enableDocument = function (path, config) {
        if (path === void 0) { path = '/document'; }
        document_1.FireDocument.server(this, path, config || {
            title: 'api document',
            date: new Date(),
            description: 'a api document',
            version: '1.0.0'
        });
    };
    FireCatRouter.prototype.group = function (path, callback) {
        callback(new group_1.default(this.router, path));
    };
    FireCatRouter.prototype.controller = function (path, control) {
        control.decoratorBindRouter(this.router, (0, common_1.isStartRouter)(path) ? '' : path, control);
    };
    return FireCatRouter;
}());
exports.FireCatRouter = FireCatRouter;
