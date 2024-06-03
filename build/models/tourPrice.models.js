"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourPrice = void 0;
const mongoose_1 = require("mongoose");
const TourPriceSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true,
});
exports.TourPrice = (0, mongoose_1.model)("TourPrice", TourPriceSchema);
