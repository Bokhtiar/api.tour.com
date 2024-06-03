import { Types } from "mongoose";

export interface ITourPrice {
  title: string;
  price: number;
  tour: Types.ObjectId;
  persone: number;
}

export interface ICreateUpdateTourPrice {
  title: string;
  price: number;
  tour: Types.ObjectId;
  persone: number;
}
