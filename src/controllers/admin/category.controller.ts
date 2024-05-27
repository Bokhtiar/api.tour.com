import { Request, Response, NextFunction } from "express";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { CategoryServices } from "../../services/admin/category.services";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { ICategoryCreateUpdate } from "../../types/admin/category.types";
import { Types } from "mongoose";

/** list of resource */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];
    const totalItems = await CategoryServices.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    if (searchQuery) {
      results = await CategoryServices.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await CategoryServices.findAll({ limit, page });
    }

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: results,
        paginate: paginate({ total_items: totalItems, page, limit }),
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** create new resoruce */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, logo } = req.body;
    const documents: ICategoryCreateUpdate = {
      name,
      logo,
    };

    /** check exist name */
    const isExistName = await CategoryServices.findOneByKey({ name: name });
    if (isExistName) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "name",
              message: "Category name already exsit",
            },
          ],
        })
      );
    }

    const data = await CategoryServices.createResource({
      documents: documents,
    });

    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        message: "Category created.",
        data: data,
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** single resoruce */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await CategoryServices.findById({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: data,
      })
    );
  } catch (error: any) {
    next(error);
  }
};
