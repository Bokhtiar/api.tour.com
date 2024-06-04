import { Router } from "express";
import { adminAuthRouter } from "./admin/admin.routes";
import { adminCategoryRoute } from "./admin/category.routes";
import { adminTourRoute } from "./admin/tour.routes";
import {adminTourPriceRouter} from './admin/tourPrice.routes'
import { adminCommentRouter } from "./admin/comment.routes";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
AppRouter.use("/admin/category", adminCategoryRoute)
AppRouter.use("/admin/tour", adminTourRoute);
AppRouter.use("/admin/tour-price", adminTourPriceRouter);
AppRouter.use("/admin/comment", adminCommentRouter)
