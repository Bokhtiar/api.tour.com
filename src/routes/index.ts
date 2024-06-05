import { Router } from "express";
import { adminTourRoute } from "./admin/tour.routes";
import { adminAuthRouter } from "./admin/admin.routes";
import { adminCommentRouter } from "./admin/comment.routes";
import { adminCategoryRoute } from "./admin/category.routes";
import { adminTourPriceRouter } from "./admin/tourPrice.routes";
import { adminPermission } from "../middleware/admin.permission.middleware";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
AppRouter.use("/admin/tour", adminPermission, adminTourRoute);
AppRouter.use("/admin/comment", adminPermission, adminCommentRouter);
AppRouter.use("/admin/category", adminPermission, adminCategoryRoute);
AppRouter.use("/admin/tour-price", adminPermission, adminTourPriceRouter);
