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
exports.TourPriceServices = void 0;
const tourPrice_models_1 = require("../../models/tourPrice.models");
/** count document */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.countDocuments();
});
/** findAll */
const findAll = ({ limit, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/** findOneByKey */
const findOneByKey = ({ params, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.findOne(Object.assign({}, params));
});
/** findOneById */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.findById({ _id });
});
/** create resource */
const createResource = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newDocuments = new tourPrice_models_1.TourPrice(Object.assign({}, documents));
    return newDocuments.save();
});
/** update */
const updateResource = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.findByIdAndUpdate(_id, Object.assign({}, documents));
});
/** destory */
const destoryResource = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tourPrice_models_1.TourPrice.findByIdAndDelete({ _id });
});
/* Search by key */
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield tourPrice_models_1.TourPrice.find({
        $or: [{ title: queryRegExp }],
    });
});
exports.TourPriceServices = {
    findAll,
    countAll,
    createResource,
    findOneByKey,
    findOneById,
    updateResource,
    destoryResource,
    searchByKey,
};
