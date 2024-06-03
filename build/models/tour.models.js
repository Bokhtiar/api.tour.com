"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tour = void 0;
const mongoose_1 = require("mongoose");
const tourSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    is_refundable: {
        type: Boolean,
        default: false,
    },
    ratting: {
        type: Number,
        default: 5,
    },
    descirption: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Tour = (0, mongoose_1.model)("Tour", tourSchema);
