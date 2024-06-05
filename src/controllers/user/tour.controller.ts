import { UserTourService } from "../../services/user/tour.services";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { Request, Response, NextFunction } from "express";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { Types } from "mongoose";

/** index */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];
    const totalItems = await UserTourService.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    if (searchQuery) {
      results = await UserTourService.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await UserTourService.findAll({ limit, page });
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

/** show */
export const show = async(req:Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const result = await UserTourService.findOneById({_id: new Types.ObjectId(id)})
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
