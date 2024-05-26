import {Types} from 'mongoose'

export interface ICategory {
    _id: Types.ObjectId,
    name: string,
    logo : string
}

export interface ICategoryCreateUpdate {
  name: string;
  logo: string;
}