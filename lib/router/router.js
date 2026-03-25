"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireCatRouter = void 0;
var Router = require("@koa/router");
var group_1 = require("../router/group");
var document_1 = require("../document");
var common_1 = require("../utils/common");
var FireCatRouter = (function () {
    function FireCatRouter() {
        this.documentStore = [];
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
        var _this = this;
        callback(new group_1.default(this.router, path, function (entry) {
            _this.documentStore.push(entry);
            document_1.FireDocument.appendDocument(entry.path, entry.routes);
        }));
    };
    FireCatRouter.prototype.controller = function (path, control, middlewares) {
        var basePath = (0, common_1.isStartRouter)(path) ? '' : path;
        var routes = control.decoratorBindRouter(this.router, basePath, control, middlewares);
        this.documentStore.push({
            path: basePath || '/',
            routes: routes
        });
        document_1.FireDocument.appendDocument(basePath || '/', routes);
    };
    FireCatRouter.prototype.getDocumentStore = function () {
        return this.documentStore;
    };
    return FireCatRouter;
}());
exports.FireCatRouter = FireCatRouter;
