import { Types } from "mongoose";
import { Tour } from "../../models/tour.models";
import { ITour, ITourCreateUpdate } from "../../types/admin/tour.types";

/** count all */
const countAll = async (): Promise<number> => {
  return await Tour.countDocuments();
};

/** find all resource */
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

/** create document */
const createResource = async ({
  documents,
}: {
  documents: ITourCreateUpdate;
}): Promise<ITour | null> => {
  const newResource = new Tour({
    ...documents,
  });
  return await newResource.save();
};

/** findOneByKey */
const findOneByKey = async(params:any):Promise<ITour | null> => {
    return await Tour.findOne({...params})
}

/** findOneById */
const findOneById = async({_id}: {_id: Types.ObjectId}):Promise<ITour | null> => {
    return await Tour.findById({ _id }).populate("category", "name");
}

/** update documents */
const updateDocuments = async({_id, documents}: {_id: Types.ObjectId, documents: ITourCreateUpdate}):Promise<ITour | null> => {
  return await Tour.findByIdAndUpdate(_id, {
    ...documents,
  });
}

/** destroy document */
const destoryResource = async({_id}: {_id: Types.ObjectId}):Promise<ITour | null> => {
  return await Tour.findByIdAndDelete({_id});
}

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

export const TourServices = {
  findAll,
  countAll,
  createResource,
  findOneByKey,
  findOneById,
  updateDocuments,
  destoryResource,
  searchByKey,
};
