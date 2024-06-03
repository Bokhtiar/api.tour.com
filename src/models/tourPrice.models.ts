import { ICreateUpdateTourPrice } from '../types/admin/tourPrice.types'
import {Schema, model} from 'mongoose'

const TourPriceSchema: Schema = new Schema<ICreateUpdateTourPrice> ({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    }, 
    persone: {
        type: Number,
        trim: true,
        required: true,
    },
    tour: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true,
})

export const TourPrice =  model<ICreateUpdateTourPrice>("TourPrice", TourPriceSchema)