import { Request, Response, NextFunction } from "express";
import { adminCommentService } from "../../services/admin/comment.services";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import {
  IComment,
  ICommentCreateUpdate,
} from "../../types/admin/comment.types";
import { Types } from "mongoose";

/** index */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];
    const totalItems = await adminCommentService.countAll();
    const { limit, page } = paginateQueryParams(req.query);
    const searchQuery = req.query.query;

    if (searchQuery) {
      results = await adminCommentService.searchByKey({
        query: searchQuery.toString(),
      });
    } else {
      results = await adminCommentService.findAll({ limit, page });
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

/** store */
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment, user, tour } = req.body;

    const documents: ICommentCreateUpdate = {
      comment,
      user,
      tour,
    };

    const result = await adminCommentService.createResource({ documents });
    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Comment created successfully",
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

    const result = await adminCommentService.findOneById({
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
    const { comment, user, tour } = req.body;

    const documents: ICommentCreateUpdate = {
      comment,
      user,
      tour,
    };

    const result = await adminCommentService.updateResource({
      _id: new Types.ObjectId(id),
      documents: documents,
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Comment updated",
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** destroy */
export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await adminCommentService.deleteResource({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: result,
        message: "Deleted successfully",
      })
    );
  } catch (error: any) {
    next(error);
  }
};
