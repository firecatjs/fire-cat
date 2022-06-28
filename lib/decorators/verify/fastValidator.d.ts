import * as ValidatorTypes from "fastest-validator";
import { CreateSchemaInterFace, FireValidatorErrorType } from "../../types";
export declare function createSchema(jsonRule: any): CreateSchemaInterFace;
export declare function fastValidator(jsonValue: {}, schema: ValidatorTypes.SyncCheckFunction): FireValidatorErrorType | null;
