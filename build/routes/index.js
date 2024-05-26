"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./admin/auth.routes");
exports.AppRouter = (0, express_1.Router)();
exports.AppRouter.use("/admin/auth", auth_routes_1.adminAuthRouter);
