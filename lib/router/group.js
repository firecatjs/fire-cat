"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../utils/common");
var FireRouterGroup = (function () {
    function FireRouterGroup(router, path, registerDocument) {
        this.router = router;
        this.path = (0, common_1.isStartRouter)(path) ? '' : path;
        this.registerDocument = registerDocument;
    }
    FireRouterGroup.prototype.concat = function (path, action, methods) {
        if (typeof path == "string") {
            return this.router[methods]((0, common_1.joinRoutePaths)(this.path, path), action);
        }
        return this.router[methods](path, action);
    };
    FireRouterGroup.prototype.concatCallback = function (path, callback) {
        if (typeof path == 'string') {
            callback(new FireRouterGroup(this.router, (0, common_1.joinRoutePaths)(this.path, path), this.registerDocument));
        }
        else {
            callback(new FireRouterGroup(this.router, path, this.registerDocument));
        }
    };
    FireRouterGroup.prototype.get = function (path, action) {
        return this.concat(path, action, 'get');
    };
    FireRouterGroup.prototype.post = function (path, action) {
        return this.concat(path, action, 'post');
    };
    FireRouterGroup.prototype.del = function (path, action) {
        return this.concat(path, action, 'del');
    };
    FireRouterGroup.prototype.put = function (path, action) {
        return this.concat(path, action, 'put');
    };
    FireRouterGroup.prototype.update = function (path, action) {
        return this.concat(path, action, 'patch');
    };
    FireRouterGroup.prototype.head = function (path, action) {
        return this.concat(path, action, 'head');
    };
    FireRouterGroup.prototype.all = function (path, action) {
        return this.concat(path, action, 'all');
    };
    FireRouterGroup.prototype.controller = function (path, control, middlewares) {
        var basePath = (0, common_1.joinRoutePaths)(this.path, path.toString());
        var routes = control.decoratorBindRouter(this.router, basePath, control, middlewares);
        if (this.registerDocument) {
            this.registerDocument({
                path: basePath,
                routes: routes
            });
        }
    };
    FireRouterGroup.prototype.group = function (path, callback) {
        this.concatCallback(path, callback);
    };
    return FireRouterGroup;
}());
exports.default = FireRouterGroup;
