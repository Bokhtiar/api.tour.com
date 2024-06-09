import { Types } from "mongoose";
import { Tour } from "../../models/tour.models";
import { ITour } from "../../types/user/tour.types";

/** count all */
const countAll = async (): Promise<number> => {
  return await Tour.countDocuments();
};

/** findOneById */
const findAll = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<ITour[] | []> => {
  return await Tour.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .exec();
};

/** findOneById */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<ITour | null> => {
  return await Tour.findById({ _id }).populate("category", "name");
};

/** tour done */
const findAllIsTourDone = async ({
  isTourDone,
}: {
  isTourDone: boolean;
}): Promise<ITour[] | []> => {
  return await Tour.find({ status: isTourDone }).sort({ _id: -1 }).exec();
};

/** tour running */
const findAllIsTourRunning = async ({
  isTourRunning,
}: {
  isTourRunning: boolean;
}): Promise<ITour[] | []> => {
  return await Tour.find({ status: isTourRunning }).sort({ _id: -1 }).exec();
};

/* Search by key */
const searchByKey = async ({
  query,
}: {
  query: string;
}): Promise<ITour[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Tour.find({
    $or: [{ title: queryRegExp }],
  });
};

const searchByPriceFilter = async ({
  min,
  max,
}: {
  min: number;
  max: number;
}): Promise<ITour[] | []> => {
  const query = {
    price: { $gte: min, $lte: max },
  };
  return Tour.find({ query }).sort({ _id: -1 }).exec();
};

export const UserTourService = {
  countAll,
  findAll,
  findAllIsTourDone,
  findAllIsTourRunning,
  findOneById,
  searchByKey,
  searchByPriceFilter,
};
