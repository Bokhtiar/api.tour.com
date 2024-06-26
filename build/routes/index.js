"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const tour_routes_1 = require("./admin/tour.routes");
const admin_routes_1 = require("./admin/admin.routes");
const comment_routes_1 = require("./admin/comment.routes");
const category_routes_1 = require("./admin/category.routes");
const tourPrice_routes_1 = require("./admin/tourPrice.routes");
const admin_permission_middleware_1 = require("../middleware/admin.permission.middleware");
const tour_routes_2 = require("./user/tour.routes");
exports.AppRouter = (0, express_1.Router)();
exports.AppRouter.use("/admin/auth", admin_routes_1.adminAuthRouter);
exports.AppRouter.use("/admin/tour", admin_permission_middleware_1.adminPermission, tour_routes_1.adminTourRoute);
exports.AppRouter.use("/admin/comment", admin_permission_middleware_1.adminPermission, comment_routes_1.adminCommentRouter);
exports.AppRouter.use("/admin/category", admin_permission_middleware_1.adminPermission, category_routes_1.adminCategoryRoute);
exports.AppRouter.use("/admin/tour-price", admin_permission_middleware_1.adminPermission, tourPrice_routes_1.adminTourPriceRouter);
/** user */
exports.AppRouter.use("/tour", tour_routes_2.tourRouter);
