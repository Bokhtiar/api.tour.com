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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthService = void 0;
const admin_models_1 = require("../../models/admin.models");
/* specific resource findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_models_1.Admin.findOne(Object.assign({}, params));
});
/* create new registration */
const registration = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newAdmin = new admin_models_1.Admin({
        name: documents.name,
        email: documents.email,
        phone: documents.phone,
        password: documents.password,
        role: documents.role,
    });
    return yield newAdmin.save();
});
exports.adminAuthService = {
    findOneByKey,
    registration,
};
