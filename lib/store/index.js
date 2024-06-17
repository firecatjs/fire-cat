"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStore = void 0;
var decorator_1 = require("../decorator");
var FireStore = (function () {
    function FireStore() {
    }
    FireStore.check = function (classKey) {
        if (!this.store.get(classKey)) {
            this.store.set(classKey, new decorator_1.DecoratorRepository());
        }
    };
    FireStore.getDecoratorRepository = function (classKey) {
        return this.store.get(classKey);
    };
    FireStore.store = new Map();
    return FireStore;
}());
exports.FireStore = FireStore;
