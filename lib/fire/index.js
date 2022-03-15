"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var bodyParser = require("koa-bodyparser");
var FireCat = (function () {
    function FireCat() {
        this.koa = new Koa();
        this.koa.use(bodyParser());
        this.koa.on('error', function (err) {
            console.log('[ERROR]');
            console.log(err);
        });
    }
    return FireCat;
}());
exports.default = FireCat;
