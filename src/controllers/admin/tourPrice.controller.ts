import { Request, Response, NextFunction } from "express";
import { TourPriceServices } from "../../services/admin/tourPrice.services";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { ICreateUpdateTourPrice } from "../../types/admin/tourPrice.types";
import { Types } from "mongoose";

/** index */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results = [];

    const totalItems = await TourPriceServices.countAll();
    const { limit, page } = paginateQueryParams(req.params);
    const searchQuery = req.query.query;

    if (searchQuery) {
      results = await TourPriceServices.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await TourPriceServices.findAll({ limit, page });
    }

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: results,
        paginate: paginate({ total_items: totalItems, page, limit }),
      })
    );
  } catch (error) {
    next(error);
  }
};

/** store */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price, tour, persone } = req.body;
    const documents: ICreateUpdateTourPrice = {
      title,
      price,
      tour,
      persone,
    };
    const result = await TourPriceServices.createResource({ documents });
    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Tour price created",
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await TourPriceServices.findOneById({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** udpate */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, price, persone, tour } = req.body;

    const documents: ICreateUpdateTourPrice = {
      title,
      price,
      persone,
      tour,
    };
    const result = await TourPriceServices.updateResource({
      _id: new Types.ObjectId(id),
      documents: documents,
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        message: "Tour price update successfully.",
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** destroy */
export const destory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await TourPriceServices.destoryResource({
      _id: new Types.ObjectId(id),
    });
    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Tour price deleted",
      })
    );
  } catch (error: any) {
    next(error);
  }
};
