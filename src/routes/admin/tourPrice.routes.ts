import { Router } from "express";
import * as TourPriceController from '../../controllers/admin/tourPrice.controller'
import { adminTourPriceValidators } from "../../validators/tourPrice.validators";
export const adminTourPriceRouter : Router = Router()

adminTourPriceRouter.get("/", TourPriceController.index);
adminTourPriceRouter.post("/", adminTourPriceValidators.createUpdate, TourPriceController.store);
adminTourPriceRouter.get("/:id", TourPriceController.show);
adminTourPriceRouter.put("/:id", adminTourPriceValidators.createUpdate, TourPriceController.update);
adminTourPriceRouter.delete("/:id", TourPriceController.destory); 