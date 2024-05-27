"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSuccessResponse = exports.HttpErrorResponse = exports.validMongooseId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/* Valid mongoose ID */
const validMongooseId = (id) => {
    return mongoose_1.default.Types.ObjectId.isValid(id);
};
exports.validMongooseId = validMongooseId;
/* Http error response */
const HttpErrorResponse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: payload.status,
        errors: [...payload.errors],
    };
});
exports.HttpErrorResponse = HttpErrorResponse;
/* Http success response */
const HttpSuccessResponse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        status: payload.status,
        message: payload.message,
        token: payload.token,
        data: payload.data,
        paginate: payload.paginate,
    };
});
exports.HttpSuccessResponse = HttpSuccessResponse;
