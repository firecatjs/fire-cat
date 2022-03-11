import * as ValidatorTypes from "fastest-validator";
import {FireValidatorErrorType} from "../../types";
const Validator = require("fastest-validator");
const v = new Validator();

export function createSchema(jsonRule) {
  return v.compile(jsonRule);
}

export function fastValidator(jsonValue = {}, schema: ValidatorTypes.SyncCheckFunction): FireValidatorErrorType | null {
  const val = schema(jsonValue);
  if (val !== true) {
    return {
      message: val[0].message,
      details: val,
    };
  }
  return null;
}