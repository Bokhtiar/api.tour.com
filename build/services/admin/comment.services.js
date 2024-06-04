"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCommentService = void 0;
const comment_models_1 = require("../../models/comment.models");
/** count all */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_models_1.Comment.countDocuments();
});
/** find all */
const findAll = ({ limit, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_models_1.Comment.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .populate("tour", 'title')
        .exec();
});
/** findOneByID */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_models_1.Comment.findById({ _id }).populate("tour", "title");
});
/** create new resource */
const createResource = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newResource = new comment_models_1.Comment(Object.assign({}, documents));
    return newResource.save();
});
/** update resorce */
const updateResource = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_models_1.Comment.findByIdAndUpdate(_id, Object.assign({}, documents));
});
/** destroy */
const deleteResource = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_models_1.Comment.findByIdAndDelete({ _id });
});
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield comment_models_1.Comment.find({
        $or: [{ comment: queryRegExp }],
    });
});
exports.adminCommentService = {
    countAll,
    findAll,
    findOneById,
    createResource,
    updateResource,
    deleteResource,
    searchByKey,
};
