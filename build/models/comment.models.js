"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    comment: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    tour: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Tour"
    },
    status: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
