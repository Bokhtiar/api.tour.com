const express = require("express");
const path = require("path");
const multer = require("multer");


import { Types } from "mongoose";
import { Category } from "../../models/category.models";
import {
  ICategory,
  ICategoryCreateUpdate,
} from "../../types/admin/category.types";


/** create new resource */
const createResource = async ({
  documents,
}: {
  documents: ICategoryCreateUpdate;
}): Promise<ICategory | null> => {
  
  const newCategory = new Category({
    name: documents?.name,
    logo: documents?.logo
  });
  return await newCategory.save();
};

/** count documents search */
const countSearchAll = async ({ query }: { query: string }): Promise<number> => {
  const queryRegExp = new RegExp(query, "i");
  const count = await Category.countDocuments({
    $or: [{ name: queryRegExp }],
  });
  return count;
};

/** count all */
const countAll = async (): Promise<number> => {
  return await Category.countDocuments();
};

/** find all resource */
const findAll = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<ICategory[] | []> => {
  return await Category.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/** find one key */
const findOneByKey = async (params: any): Promise<ICategory | null> => {
  return await Category.findOne({ ...params });
};

/** find by id */
const findById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ICategory | null> => {
  return await Category.findById(_id);
};

/** resource update */
const updateResource = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: ICategoryCreateUpdate;
}) => {
  return await Category.findByIdAndUpdate(_id, {
    name: documents?.name,
    logo: documents?.logo,
  });
};

/** resource delete */
const destoryResource = async ({ _id }: { _id: Types.ObjectId }) => {
  return await Category.findByIdAndRemove(_id);
};

/* Search by key */
const searchByKey = async ({
  query,
  page = 1,
  limit = 10,
}: {
  query: string;
  page?: number;
  limit?: number;
}): Promise<ICategory[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Category.find({
    $or: [{ name: queryRegExp }],
  })
    .sort({ _id: -1 }) // Sort results by _id in descending order
    .skip((page - 1) * limit) // Skip the appropriate number of results for pagination
    .limit(limit) // Limit the number of results returned
    .exec(); // Execute the query
};

export const CategoryServices = {
  findAll,
  countAll,
  findById,
  searchByKey,
  findOneByKey,
  countSearchAll,
  createResource,
  updateResource,
  destoryResource,
};
