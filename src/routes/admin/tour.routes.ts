import { Router } from "express";
import multer from "multer";
// import { adminCategoryValidators } from "../../validators/category.validators";
import * as tourController from "../../controllers/admin/tour.controller";
import { adminTourValidators } from "../../validators/tour.validators";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const adminTourRoute: Router = Router();
adminTourRoute.get("/", tourController.index);
adminTourRoute.get("/:id", tourController.show);

adminTourRoute.post(
  "/",
  upload.single("image"),
  adminTourValidators.createUpdate,
  tourController.store
);

adminTourRoute.put(
  "/:id",
  upload.single("image"),
  adminTourValidators.createUpdate,
  tourController.update
);

adminTourRoute.delete("/:id", tourController.destory);
