import { Router } from "express";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import {adminCategoryValidators} from '../../validators/category.validators'
import * as CategoryController from '../../controllers/admin/category.controller'


const storage = multer.memoryStorage();
const upload = multer({ storage });

export const adminCategoryRoute:Router = Router()
adminCategoryRoute.get('/', CategoryController.index)
adminCategoryRoute.get("/:id", CategoryController.show)
adminCategoryRoute.delete("/:id", CategoryController.desotry)
adminCategoryRoute.post(
  "/",
  upload.single("logo"),
  adminCategoryValidators.createUpdate,
  CategoryController.store
);

// adminCategoryRoute.post("/", upload.single("logo"), (req : Request, res: Response) => {
//   console.log("Image buffer:", req.file?.buffer);
// });

adminCategoryRoute.put("/:id", adminCategoryValidators.createUpdate, CategoryController.update)