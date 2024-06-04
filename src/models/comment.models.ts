import { Schema, model } from "mongoose";
import { ICommentCreateUpdate } from "../types/admin/comment.types";

const commentSchema = new Schema<ICommentCreateUpdate>(
  {
    comment: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tour"
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Comment = model<ICommentCreateUpdate>("Comment", commentSchema);
