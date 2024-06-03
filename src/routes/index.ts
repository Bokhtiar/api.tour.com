import { Router } from "express";
import { adminAuthRouter } from "./admin/admin.routes";
import { adminCategoryRoute } from "./admin/category.routes";
import { adminTourRoute } from "./admin/tour.routes";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
AppRouter.use("/admin/category", adminCategoryRoute)
AppRouter.use("/admin/tour", adminTourRoute);
