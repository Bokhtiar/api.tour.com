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
exports.adminPermission = void 0;
const jwt = require("jsonwebtoken");
/* admin permission handle */
const adminPermission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield req.headers.authorization;
        if (!token) {
            return res.status(404).json({
                status: false,
                message: "Authorization token not found.",
            });
        }
        // decode token
        const splitToken = yield token.split(" ")[1];
        const decode = yield jwt.verify(splitToken, process.env.JWT_SECRET);
        if (decode.role !== "admin") {
            return res.status(410).json({
                status: false,
                errors: { message: "You have no permission to access." },
            });
        }
        const user = {
            id: decode.id,
            name: decode.name,
            role: decode.role,
        };
        req.user = user;
        next();
        return;
    }
    catch (error) {
        if (error) {
            res.status(401).json({
                status: false,
                errors: [
                    {
                        field: "Token",
                        message: "Token expaired.",
                    },
                ],
            });
        }
    }
});
exports.adminPermission = adminPermission;
