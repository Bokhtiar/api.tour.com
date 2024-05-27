import { Router } from "express";
import {adminCategoryValidators} from '../../validators/category.validators'
import * as CategoryController from '../../controllers/admin/category.controller'

export const adminCategoryRoute:Router = Router()
adminCategoryRoute.get('/', CategoryController.index)
adminCategoryRoute.get("/:id", CategoryController.show)
adminCategoryRoute.delete("/:id", CategoryController.desotry)
adminCategoryRoute.post("/",adminCategoryValidators.createUpdate, CategoryController.store);
adminCategoryRoute.put("/:id", adminCategoryValidators.createUpdate, CategoryController.update)