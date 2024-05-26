import { Types } from "mongoose";
import { Category } from "../../models/category.models";
import {
  ICategory,
  ICategoryCreateUpdate,
} from "../../types/admin/category.types";

/** count documents */
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
const findOne = async ({
  params,
}: {
  params: any;
}): Promise<ICategory | null> => {
  return await Category.findOne({ ...params });
};

/** create new resource */
const createResource = async({documents}: {documents: ICategoryCreateUpdate}):Promise<ICategory | null> => {
    const newCategory = new Category({
        name: documents?.name,
        logo: documents?.logo
    })
    return await newCategory.save()
}

/** resource update */
const updateResource = async({_id, documents}: {_id:Types.ObjectId, documents:ICategoryCreateUpdate}) => {
    return await Category.findByIdAndUpdate(_id, {
        name: documents?.name,
        logo: documents?.logo
    })
}

/** resource delete */
const resourceDestory = async({_id}: {_id: Types.ObjectId}) => {
    return await Category.findByIdAndRemove(_id)
}