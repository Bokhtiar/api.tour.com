"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCategoryRoute = void 0;
const express_1 = require("express");
const category_validators_1 = require("../../validators/category.validators");
const CategoryController = __importStar(require("../../controllers/admin/category.controller"));
exports.adminCategoryRoute = (0, express_1.Router)();
exports.adminCategoryRoute.get('/', CategoryController.index);
exports.adminCategoryRoute.get("/:id", CategoryController.show);
exports.adminCategoryRoute.delete("/:id", CategoryController.desotry);
exports.adminCategoryRoute.post("/", category_validators_1.adminCategoryValidators.createUpdate, CategoryController.store);
exports.adminCategoryRoute.put("/:id", category_validators_1.adminCategoryValidators.createUpdate, CategoryController.update);
