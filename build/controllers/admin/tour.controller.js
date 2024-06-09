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
const index_helper_1 = require("../../helpers/index.helper");
const tour_services_1 = require("../../services/admin/tour.services");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
const fileUpload_helpers_1 = require("../../helpers/fileUpload.helpers");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield tour_services_1.TourServices.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.params);
        const searchQuery = req.query.query;
        if (searchQuery) {
            results = yield tour_services_1.TourServices.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield tour_services_1.TourServices.findAll({ limit, page });
        }
        console.log("results", results);
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
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const { title, location, apply_date, end_apply_date, is_tour_done, days, max_people, category, is_refundable, ratting, descirption, status, } = req.body;
        const isTitleExist = yield tour_services_1.TourServices.findOneByKey({ title: title });
        if (isTitleExist) {
            return res.status(409).json({
                status: false,
                message: "Tour title already exist.",
            });
        }
        const imageBuffer = req.file.buffer;
        const filename = yield (0, fileUpload_helpers_1.FileUpload)(imageBuffer);
        const documents = {
            title: title,
            location: location,
            apply_date: apply_date,
            end_apply_date: end_apply_date,
            days: days,
            max_people: max_people,
            category: category,
            ratting: ratting,
            descirption: descirption,
            image: filename,
            is_refundable: is_refundable,
            is_tour_done: is_tour_done,
            status: status,
        };
        const result = yield tour_services_1.TourServices.createResource({ documents: documents });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour created successfully.",
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
        const result = yield tour_services_1.TourServices.findOneById({
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
/** update */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, location, apply_date, end_apply_date, is_tour_done, days, max_people, category, is_refundable, ratting, descirption, status, } = req.body;
        // is title exist
        const isExistTitle = yield tour_services_1.TourServices.findOneByKey({ title: title });
        if (isExistTitle && isExistTitle._id.toString() !== id) {
            return res.status(409).json(yield (0, index_helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Title",
                        message: "Tour title already exists.",
                    },
                ],
            }));
        }
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const imageBuffer = req.file.buffer;
        const filename = yield (0, fileUpload_helpers_1.FileUpload)(imageBuffer);
        const documents = {
            title: title,
            location: location,
            apply_date: apply_date,
            end_apply_date: end_apply_date,
            days: days,
            max_people: max_people,
            category: category,
            ratting: ratting,
            descirption: descirption,
            image: filename,
            is_refundable: is_refundable,
            is_tour_done: is_tour_done,
            status: status,
        };
        // existing image delete
        const existTour = yield tour_services_1.TourServices.findOneById({ _id: new mongoose_1.Types.ObjectId(id) });
        (0, fileUpload_helpers_1.ExistFileDelete)(existTour === null || existTour === void 0 ? void 0 : existTour.image);
        const result = yield tour_services_1.TourServices.updateDocuments({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: documents,
        });
        res.status(201).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: result,
            message: "Tour updated successfully.",
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
        const existTour = yield tour_services_1.TourServices.destoryResource({ _id: new mongoose_1.Types.ObjectId(id) });
        (0, fileUpload_helpers_1.ExistFileDelete)(existTour === null || existTour === void 0 ? void 0 : existTour.image);
        res.status(201).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            message: "Tour deleted successfully.",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.destory = destory;
