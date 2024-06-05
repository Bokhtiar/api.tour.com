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
exports.priceFilter = exports.isTourRunning = exports.isTourDone = exports.show = exports.index = void 0;
const tour_services_1 = require("../../services/user/tour.services");
const index_helper_1 = require("../../helpers/index.helper");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
/** index */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield tour_services_1.UserTourService.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        if (searchQuery) {
            results = yield tour_services_1.UserTourService.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield tour_services_1.UserTourService.findAll({ limit, page });
        }
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: results,
            paginate: (0, pagination_helper_1.paginate)({ total_items: totalItems, page, limit }),
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.index = index;
/** show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield tour_services_1.UserTourService.findOneById({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.show = show;
/** isTourDone */
const isTourDone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tour_services_1.UserTourService.findAllIsTourDone({ isTourDone: false });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour complete list"
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.isTourDone = isTourDone;
/** isTourRunning */
const isTourRunning = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield tour_services_1.UserTourService.findAllIsTourRunning({ isTourRunning: true });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour running list"
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.isTourRunning = isTourRunning;
/** filter price */
const priceFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const min = parseInt(req.query.min);
        const max = parseInt(req.query.max);
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ error: "Invalid min or max value" });
        }
        const results = yield tour_services_1.UserTourService.searchByPriceFilter({ min, max });
        res.json(results);
    }
    catch (error) {
        next(error);
    }
});
exports.priceFilter = priceFilter;
