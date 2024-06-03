import { Types, Document } from "mongoose";

export interface ITour {
  _id: Types.ObjectId;
  title: string;
  location: string;
  apply_date: Date;
  end_apply_date: Date;
  is_tour_done?: boolean;
  days: number;
  max_people: number;
  category: Types.ObjectId;
  is_refundable?: boolean;
  ratting?: number;
  descirption?: string;
  image: string;
  status?: boolean;
}

export interface ITourModel extends Document {
  title: string;
  location: string;
  apply_date: Date;
  end_apply_date: Date;
  is_tour_done?: boolean;
  days: number;
  max_people: number;
  category: Types.ObjectId;
  is_refundable?: boolean;
  ratting?: number;
  descirption?: string;
  image: string;
  status?: boolean;
}

export interface ITourCreateUpdate {
  title: string;
  location: string;
  apply_date: Date;
  end_apply_date: Date;
  is_tour_done?: boolean;
  days: number;
  max_people: number;
  category: Types.ObjectId;
  is_refundable?: boolean;
  ratting?: number;
  descirption?: string;
  image: string;
  status?: boolean;
}

