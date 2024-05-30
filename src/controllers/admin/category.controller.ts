import { Request, Response, NextFunction } from "express";
import {
  HttpErrorResponse,
  HttpSuccessResponse,
} from "../../helpers/index.helper";
import { CategoryServices } from "../../services/admin/category.services";
import { paginate, paginateQueryParams } from "../../helpers/pagination.helper";
import { ICategoryCreateUpdate } from "../../types/admin/category.types";
import { Types } from "mongoose";

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { Category, ICategory } from "../../models/category.models";
const imagesDir = path.join(__dirname, "../../public/uploads"); 



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
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { name } = req.body;
    const imageBuffer = req.file.buffer;
    
    // Resize the image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(500, 500)
      .jpeg({ quality: 80 })
      .toBuffer();

    const filename = `${Date.now()}.jpg`;
    const outputPath = path.join(imagesDir, filename);
    fs.writeFileSync(outputPath, resizedImageBuffer);

     const documents: ICategoryCreateUpdate = {
       name,
       logo:filename,
     };

     const data = await CategoryServices.createResource({
       documents: documents,
     });

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: data,
      })
    );
  } catch (error) {
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

/** update resource */
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, logo } = req.body;
    const documents: ICategoryCreateUpdate = {
      name,
      logo,
    };

    /* check unique name */
    const existWithName = await CategoryServices.findOneByKey({ name });
    if (existWithName && existWithName._id.toString() !== id) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Name",
              message: "Category name already exists.",
            },
          ],
        })
      );
    }

    const data = await CategoryServices.updateResource({
      _id: new Types.ObjectId(id),
      documents: documents,
    });

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: data,
        message: "Category updated",
      })
    );
  } catch (error: any) {
    next(error);
  }
};

/** resource desotry */
export const desotry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = await CategoryServices.destoryResource({
      _id: new Types.ObjectId(id),
    });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        data: data,
        message: "Category deleted",
      })
    );
  } catch (error: any) {
    next(error);
  }
};
