"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireDocument = void 0;
var types_1 = require("../types");
var common_1 = require("../utils/common");
var FireDocument = (function () {
    function FireDocument() {
    }
    FireDocument.appendDocument = function (path, context, target) {
        FireDocument.documents.push({
            path: path,
            target: target,
            context: context
        });
    };
    FireDocument.server = function (router, path, config) {
        router.router.get(path, function (ctx, next) {
            var doc = {
                title: config.title,
                description: config.description,
                date: config.date,
                version: config.version,
                body: [],
            };
            FireDocument.documents.forEach(function (item) {
                var children = item.context.getRoutes();
                children.forEach(function (item2) {
                    var mission = {
                        path: item.path + item2.path,
                        methods: item2.method,
                        rule: [],
                        description: item2.description,
                    };
                    if (!mission.path) {
                        mission.path = '/';
                    }
                    else {
                        mission.path = (0, common_1.fixedEndPath)(mission.path);
                    }
                    var methodStore = item.context.getMiddlewares(item2.propertyKey);
                    if (Array.isArray(methodStore)) {
                        methodStore.forEach(function (intItem) {
                            if (intItem.type == types_1.InterceptorType.RULE) {
                                mission.rule.push(intItem.data);
                            }
                        });
                    }
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
