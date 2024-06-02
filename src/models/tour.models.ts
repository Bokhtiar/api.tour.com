import { Schema, model, Document } from 'mongoose'
import {ITourCreateUpdate} from '../types/admin/tour.types'

const tourSchema: Schema = new Schema<ITourCreateUpdate>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  apply_date: {
    type: Date,
    required: true,
  },
  end_apply_date: {
    type: Date,
    required: true,
  },
  is_tour_done: {
    type: Boolean,
    default: false,
  },
  days: {
    type: Number,
    required: true,
  },
  max_people: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  is_refundable: {
    type: Boolean,
    default: false,
  },
  ratting: {
    type: Number,
    default: 5
  },
  descirption: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
});

export const Tour = model<ITourCreateUpdate>("Tour", tourSchema)