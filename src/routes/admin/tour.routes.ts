import { Router } from "express";
import multer from "multer";
// import { adminCategoryValidators } from "../../validators/category.validators";
import * as tourController from "../../controllers/admin/tour.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const adminTourRoute: Router = Router();
adminTourRoute.get("/", tourController.index);
adminTourRoute.get("/:id", tourController.show)
adminTourRoute.post(
  "/",
  upload.single("image"),
  tourController.store
);

