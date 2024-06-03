import { Request, Response, NextFunction } from "express";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { TourServices } from "../../services/admin/tour.services";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { ITourCreateUpdate } from "../../types/admin/tour.types";
import { Types } from "mongoose";
import { FileUpload } from "../../helpers/fileUpload.helpers";

// import crypto from "crypto";
// import fs from "fs";
// import path from "path";
// import sharp from "sharp";

// const imagesDir = path.join(__dirname, "../../../public/uploads");

/** index */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results = [];

    const totalItems = await TourServices.countAll();
    const { limit, page } = paginateQueryParams(req.params);
    const searchQuery = req.query.query;

    if (searchQuery) {
      results = await TourServices.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await TourServices.findAll({ limit, page });
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
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const {
      title,
      location,
      apply_date,
      end_apply_date,
      is_tour_done,
      days,
      max_people,
      category,
      is_refundable,
      ratting,
      descirption,
      status
    } = req.body;

    const imageBuffer = req.file.buffer;
    const filename = await FileUpload(imageBuffer)

    const documents: ITourCreateUpdate = {
      title: title,
      location: location,
      apply_date: apply_date,
      end_apply_date: end_apply_date,
      days: days,
      max_people: max_people,
      category : category,
      ratting: ratting,
      descirption: descirption,
      image: filename,
      is_refundable: is_refundable,
      is_tour_done: is_tour_done,
      status: status
    };

    const result = await TourServices.createResource({documents: documents})

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: 'Tour created successfully.'
      })
    );
  } catch (error) {
    next(error);
  }
};

/** show */
export const show = async(req:Request, res:Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await TourServices.findOneById({_id: new Types.ObjectId(id)})
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
      })
    );
  } catch (error:any) {
    next(error)
  }
}