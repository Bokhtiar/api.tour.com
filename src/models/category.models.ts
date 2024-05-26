import { Schema, model } from "mongoose";
import { ICategory } from "../types/admin/category.types";

const categorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    logo: {
      type: String,
      trim: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Category = model<ICategory>("Category", categorySchema);
