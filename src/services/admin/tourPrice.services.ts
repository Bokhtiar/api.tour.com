import { Types } from "mongoose";
import { TourPrice } from "../../models/tourPrice.models";
import {
  ICreateUpdateTourPrice,
  ITourPrice,
} from "../../types/admin/tourPrice.types";
 
/** count document */
const countAll = async (): Promise<number> => {
  return await TourPrice.countDocuments();
};

/** findAll */
const findAll = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<ITourPrice[] | []> => {
  return await TourPrice.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/** findOneByKey */
const findOneByKey = async ({
  params,
}: {
  params: Types.ObjectId;
}): Promise<ITourPrice | null> => {
  return await TourPrice.findOne({ ...params });
};

/** findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ITourPrice | null> => {
  return await TourPrice.findById({ _id });
};

/** create resource */
const createResource = async ({
  documents,
}: {
  documents: ICreateUpdateTourPrice;
}): Promise<ITourPrice | null> => {
  const newDocuments = new TourPrice({ ...documents });
  return newDocuments.save();
};

/** update */
const updateResource = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: ICreateUpdateTourPrice;
}): Promise<ITourPrice | null> => {
  return await TourPrice.findByIdAndUpdate(_id, { ...documents });
};

/** destory */
const destoryResource  = async({_id}: {_id: Types.ObjectId}):Promise<ITourPrice | null> => {
    return await TourPrice.findByIdAndDelete({_id})
}

/* Search by key */
const searchByKey = async ({
  query,
}: {
  query: string;
}): Promise<ITourPrice[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await TourPrice.find({
    $or: [{ title: queryRegExp }],
  });
};

export const TourPriceServices = {
  findAll,
  countAll,
  createResource,
  findOneByKey,
  findOneById,
  updateResource,
  destoryResource,
  searchByKey,
};