"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastValidator = exports.createSchema = void 0;
var Validator = require("fastest-validator");
var v = new Validator();
function createSchema(jsonRule) {
    return v.compile(jsonRule);
}
exports.createSchema = createSchema;
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
exports.fastValidator = fastValidator;
