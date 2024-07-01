"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = createSchema;
exports.fastValidator = fastValidator;
var Validator = require("fastest-validator");
var v = new Validator();
function createSchema(jsonRule) {
    return {
        jsonRule: jsonRule,
        v: v.compile(jsonRule)
    };
}
function fastValidator(jsonValue, schema) {
    if (jsonValue === void 0) { jsonValue = {}; }
    var val = schema(jsonValue);
    if (val !== true) {
        return {
            message: val[0].message,
            details: val,
        };
    }
    return null;
}
