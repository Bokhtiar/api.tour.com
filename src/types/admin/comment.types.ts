import { Types } from "mongoose";

export interface IComment {
  _id: Types.ObjectId;
  comment: string;
  tour: Types.ObjectId;
  user: Types.ObjectId;
  status?: boolean
}

export interface ICommentCreateUpdate {
  comment: string;
  tour: Types.ObjectId;
  user: Types.ObjectId;
  status?: boolean,
}
