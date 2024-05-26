import express, { Express, Request, Response } from "express";
import { Router } from "express";
import * as AuthController from "../../controllers/admin/admin.controller";

export const adminAuthRouter: Router = Router();

adminAuthRouter.post("/login", AuthController.login);
adminAuthRouter.post("/register", AuthController.register);
