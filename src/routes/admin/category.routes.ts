import { Router } from "express";
import * as CategoryController from '../../controllers/admin/category.controller'
import {adminCategoryValidators} from '../../validators/category.validators'

export const adminCategoryRoute:Router = Router()
adminCategoryRoute.get('/', CategoryController.index)
adminCategoryRoute.post("/",adminCategoryValidators.createUpdate, CategoryController.store);
adminCategoryRoute.get("/:id", CategoryController.show)