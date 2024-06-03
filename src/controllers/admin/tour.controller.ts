import { Request, Response, NextFunction } from "express";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { TourServices } from "../../services/admin/tour.services";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { ITourCreateUpdate } from "../../types/admin/tour.types";
import { Types } from "mongoose";
import { ExistFileDelete, FileUpload } from "../../helpers/fileUpload.helpers";

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
      status,
    } = req.body;

    const isTitleExist = await TourServices.findOneByKey({ name: name });
    if (isTitleExist) {
      return res.status(409).json({
        status: false,
        message: "Tour title already exist.",
      });
    }

    const imageBuffer = req.file.buffer;
    const filename = await FileUpload(imageBuffer);

    const documents: ITourCreateUpdate = {
      title: title,
      location: location,
      apply_date: apply_date,
      end_apply_date: end_apply_date,
      days: days,
      max_people: max_people,
      category: category,
      ratting: ratting,
      descirption: descirption,
      image: filename,
      is_refundable: is_refundable,
      is_tour_done: is_tour_done,
      status: status,
    };

    const result = await TourServices.createResource({ documents: documents });

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Tour created successfully.",
      })
    );
  } catch (error) {
    next(error);
  }
};

/** show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await TourServices.findOneById({
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

/** update */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

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
      status,
    } = req.body;

    // is title exist
    const isExistTitle = await TourServices.findOneByKey({ title: title });
    if (isExistTitle && isExistTitle._id.toString() !== id) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Name",
              message: "Tour title already exists.",
            },
          ],
        })
      );
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const imageBuffer = req.file.buffer;
    const filename = await FileUpload(imageBuffer);

    const documents: ITourCreateUpdate = {
      title: title,
      location: location,
      apply_date: apply_date,
      end_apply_date: end_apply_date,
      days: days,
      max_people: max_people,
      category: category,
      ratting: ratting,
      descirption: descirption,
      image: filename,
      is_refundable: is_refundable,
      is_tour_done: is_tour_done,
      status: status,
    };

    // existing image delete
    const existTour = await TourServices.findOneById({_id: new Types.ObjectId(id)})

    ExistFileDelete(existTour?.image)
    

    const result = await TourServices.updateDocuments({
      _id: new Types.ObjectId(id),
      documents: documents,
    });

    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Tour updated successfully.",
      })
    );
  } catch (error: any) {
    next(error);
  }
};


/** destroy */
export const destory = async(req:Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const existTour = await TourServices.destoryResource({_id: new Types.ObjectId(id)})
    ExistFileDelete(existTour?.image)
     res.status(201).json(
       await HttpSuccessResponse({
         status: true,
         message: "Tour deleted successfully.",
       })
     );
  } catch (error:any) {
    next(error)
  }
}