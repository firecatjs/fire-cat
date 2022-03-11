import * as Validator from "fastest-validator";
import * as Koa from "koa";

export interface FireValidatorErrorType {
  message: string;
  details: Validator.ValidationError[]
}

export interface SyncCheckFunction extends Validator.SyncCheckFunction {}

export interface Context extends Koa.Context {}
