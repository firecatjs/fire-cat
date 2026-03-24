"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireDocument = void 0;
var types_1 = require("../types");
var common_1 = require("../utils/common");
var FireDocument = (function () {
    function FireDocument() {
    }
    FireDocument.appendDocument = function (path, routes) {
        FireDocument.documents.push({
            path: path,
            routes: routes
        });
    };
    FireDocument.server = function (router, path, config) {
        router.router.get(path, function (ctx) {
            var doc = {
                title: config.title,
                description: config.description,
                date: config.date,
                version: config.version,
                body: [],
            };
            router.getDocumentStore().forEach(function (item) {
                item.routes.forEach(function (route) {
                    var mission = {
                        path: (0, common_1.fixedEndPath)(route.path || item.path),
                        methods: route.method,
                        rule: [],
                        description: route.description,
                    };
                    route.middlewares.forEach(function (intItem) {
                        if (intItem.type == types_1.InterceptorType.RULE) {
                            mission.rule.push(intItem.data);
                        }
                    });
                    doc.body.push(mission);
                });
            });
            ctx.body = doc;
        });
    };
    FireDocument.documents = [];
    return FireDocument;
}());
exports.FireDocument = FireDocument;
