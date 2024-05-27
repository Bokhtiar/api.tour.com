import { Router } from "express";
import { adminAuthRouter } from "./admin/admin.routes";
import { adminCategoryRoute } from "./admin/category.routes";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
AppRouter.use("/admin/category", adminCategoryRoute)
