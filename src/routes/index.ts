import { Router } from "express";
import { adminAuthRouter } from "./admin/admin.routes";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
