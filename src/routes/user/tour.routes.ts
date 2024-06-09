import { Router } from "express";
import * as TourController from "../../controllers/user/tour.controller";
export const tourRouter: Router = Router();

tourRouter.get("/", TourController.index);
tourRouter.get("/show/:id", TourController.show);
tourRouter.get("/done", TourController.isTourDone);
tourRouter.get("/running", TourController.isTourRunning);
tourRouter.get("/price-filter", TourController.priceFilter);
