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
exports.adminCategoryValidators = void 0;
const async_validator_1 = __importDefault(require("async-validator"));
/* Resource create & update validaor */
const createUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const descriptor = {
        name: {
            type: "string",
            required: true,
            message: "Category Name is required.",
        },
    };
    /* Execute the validator */
    const validator = new async_validator_1.default(descriptor);
    validator.validate(Object.assign({}, req.body), (errors) => {
        if (errors) {
            return res.status(422).json({
                status: false,
                errors,
            });
        }
        next();
    });
});
exports.adminCategoryValidators = {
    createUpdate,
};
