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
exports.destory = exports.update = exports.show = exports.store = exports.index = void 0;
const tourPrice_services_1 = require("../../services/admin/tourPrice.services");
const index_helper_1 = require("../../helpers/index.helper");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
/** index */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield tourPrice_services_1.TourPriceServices.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.params);
        const searchQuery = req.query.query;
        if (searchQuery) {
            results = yield tourPrice_services_1.TourPriceServices.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield tourPrice_services_1.TourPriceServices.findAll({ limit, page });
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
/** store */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, tour, persone } = req.body;
        const documents = {
            title,
            price,
            tour,
            persone,
        };
        const result = yield tourPrice_services_1.TourPriceServices.createResource({ documents });
        res.status(201).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour price created",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.store = store;
/** show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield tourPrice_services_1.TourPriceServices.findOneById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
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
/** udpate */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, price, persone, tour } = req.body;
        const documents = {
            title,
            price,
            persone,
            tour,
        };
        const result = yield tourPrice_services_1.TourPriceServices.updateResource({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: documents,
        });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            message: "Tour price update successfully.",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
/** destroy */
const destory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield tourPrice_services_1.TourPriceServices.destoryResource({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(201).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour price deleted",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.destory = destory;
