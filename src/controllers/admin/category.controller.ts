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
import { FileUpload } from "../../helpers/fileUpload.helpers";

const imagesDir = path.join(__dirname, "../../../public/uploads");

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let results: any = [];
    let totalItems: any = [];

    const { limit, page } = paginateQueryParams(req.query);

    const searchQuery = req.query.query;

    if (searchQuery) {
      totalItems = await CategoryServices.countSearchAll({
        query: searchQuery.toString(),
      });
      results = await CategoryServices.searchByKey({
        query: searchQuery.toString(),
        limit,
        page,
      });
    } else {
      totalItems = await CategoryServices.countAll();
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

    const filename = await FileUpload(imageBuffer);
    const documents: ICategoryCreateUpdate = {
      name,
      logo: filename,
    };

    const isNameExist = await CategoryServices.findOneByKey({ name: name });
    if (isNameExist) {
      return res.status(409).json({
        status: false,
        message: "Category name already exist.",
      });
    }

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
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const imageBuffer = req.file.buffer;

    // Fetch the existing category to get the current logo filename
    const existingCategory = await CategoryServices.findOneByKey({ _id: id });
    if (!existingCategory) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "id",
              message: "Category not found.",
            },
          ],
        })
      );
    }

    // existing image delete
    let shouldDeleteOldFile = true;
    // Delete the existing logo file if it exists and should be deleted
    if (shouldDeleteOldFile && existingCategory.logo) {
      const oldImagePath = path.join(imagesDir, existingCategory.logo);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Save the new image
    // fs.writeFileSync(outputPath, resizedImageBuffer);
    const filename = await FileUpload(imageBuffer);

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

    const documents: ICategoryCreateUpdate = {
      name,
      logo: filename,
    };

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

/** resource destroy */
export const desotry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Fetch the existing category to get the current logo filename
    const existingCategory = await CategoryServices.findOneByKey({ _id: id });
    if (!existingCategory) {
      return res.status(404).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "id",
              message: "Category not found.",
            },
          ],
        })
      );
    }

    // Delete the existing logo file if it exists
    if (existingCategory.logo) {
      const oldImagePath = path.join(imagesDir, existingCategory.logo);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Delete the data from the database
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
