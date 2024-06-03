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
exports.TourServices = void 0;
const tour_models_1 = require("../../models/tour.models");
/** count all */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.countDocuments();
});
/** find all resource */
const findAll = ({ limit, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/** create document */
const createResource = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newResource = new tour_models_1.Tour(Object.assign({}, documents));
    return yield newResource.save();
});
/** findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.findOne(Object.assign({}, params));
});
/** findOneById */
const findOneById = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.findById({ _id }).populate("category", "name");
});
/** update documents */
const updateDocuments = ({ _id, documents }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.findByIdAndUpdate(_id, Object.assign({}, documents));
});
/** destroy document */
const destoryResource = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.findByIdAndDelete({ _id });
});
/* Search by key */
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield tour_models_1.Tour.find({
        $or: [{ title: queryRegExp }],
    });
});
exports.TourServices = {
    findAll,
    countAll,
    createResource,
    findOneByKey,
    findOneById,
    updateDocuments,
    destoryResource,
    searchByKey,
};
