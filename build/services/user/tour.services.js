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
exports.UserTourService = void 0;
const tour_models_1 = require("../../models/tour.models");
/** count all */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.countDocuments();
});
/** findOneById */
const findAll = ({ limit, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/** findOneById */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.findById({ _id }).populate("Category", "name");
});
/** tour done */
const findAllIsTourDone = ({ isTourDone, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.find({ status: isTourDone }).sort({ _id: -1 }).exec();
});
/** tour running */
const findAllIsTourRunning = ({ isTourRunning, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield tour_models_1.Tour.find({ status: isTourRunning }).sort({ _id: -1 }).exec();
});
/* Search by key */
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield tour_models_1.Tour.find({
        $or: [{ title: queryRegExp }],
    });
});
const searchByPriceFilter = ({ min, max, }) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {
        price: { $gte: min, $lte: max },
    };
    return tour_models_1.Tour.find({ query }).sort({ _id: -1 }).exec();
});
exports.UserTourService = {
    countAll,
    findAll,
    findAllIsTourDone,
    findAllIsTourRunning,
    findOneById,
    searchByKey,
    searchByPriceFilter,
};
