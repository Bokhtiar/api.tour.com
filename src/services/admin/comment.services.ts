import { Types } from "mongoose";
import { Comment } from "../../models/comment.models";
import {
  IComment,
  ICommentCreateUpdate,
} from "../../types/admin/comment.types";

/** count all */
const countAll = async (): Promise<number> => {
  return await Comment.countDocuments();
};

/** find all */
const findAll = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}): Promise<IComment[] | []> => {
  return await Comment.find()
    .sort({ _id: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .populate("tour", 'title')
    .exec();
    
};

/** findOneByID */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IComment | null> => {
  return await Comment.findById({ _id }).populate("tour", "title");
};

/** create new resource */
const createResource = async ({
  documents,
}: {
  documents: ICommentCreateUpdate;
}): Promise<IComment | null> => {
  const newResource = new Comment({
    ...documents,
  });
  return newResource.save();
};

/** update resorce */
const updateResource = async ({
  _id,
  documents,
}: {
  _id: Types.ObjectId;
  documents: ICommentCreateUpdate;
}): Promise<IComment | null> => {
    return await Comment.findByIdAndUpdate(_id, { ...documents });
};

/** destroy */
const deleteResource = async({_id}: {_id: Types.ObjectId}):Promise<IComment | null> => {
    return await Comment.findByIdAndDelete({_id});
}

const searchByKey = async ({
  query,
}: {
  query: string;
}): Promise<IComment[] | []> => {
  const queryRegExp = new RegExp(query, "i");
  return await Comment.find({
    $or: [{ comment: queryRegExp }],
  });
};

export const adminCommentService = {
  countAll,
  findAll,
  findOneById,
  createResource,
  updateResource,
  deleteResource,
  searchByKey,
};
