import * as ValidatorTypes from "fastest-validator";
import { FireValidatorErrorType } from "../../types";
export declare function createSchema(jsonRule: any): any;
export declare function fastValidator(jsonValue: {}, schema: ValidatorTypes.SyncCheckFunction): FireValidatorErrorType | null;
