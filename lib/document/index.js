"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireDocument = void 0;
var types_1 = require("../types");
var decorator_1 = require("../decorator");
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
    FireDocument.server = function (router, path) {
        router.router.get(path, function (ctx, next) {
            var doc = {
                body: []
            };
            FireDocument.documents.forEach(function (item) {
                var children = item.context.getRouterArray();
                children.forEach(function (item2) {
                    var mission = {
                        path: item.path + item2.path,
                        methods: item2.method,
                        rule: []
                    };
                    if (!mission.path) {
                        mission.path = '/';
                    }
                    var methodStore = (0, decorator_1.getDecoratorStoreMetaData)(item.target, item2.propertyKey);
                    if (methodStore) {
                        var inter = methodStore.getInterceptor();
                        inter.forEach(function (intItem) {
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
