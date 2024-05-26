import { Router } from "express";
import { adminAuthRouter } from "./admin/auth.routes";

export const AppRouter: Router = Router();
AppRouter.use("/admin/auth", adminAuthRouter);
