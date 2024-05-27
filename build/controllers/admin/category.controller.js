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
exports.show = exports.store = exports.index = void 0;
const index_helper_1 = require("../../helpers/index.helper");
const category_services_1 = require("../../services/admin/category.services");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
/** list of resource */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = [];
        const totalItems = yield category_services_1.CategoryServices.countAll();
        const { limit, page } = (0, pagination_helper_1.paginateQueryParams)(req.query);
        const searchQuery = req.query.query;
        if (searchQuery) {
            results = yield category_services_1.CategoryServices.searchByKey({
                query: searchQuery.toString(),
            });
        }
        else {
            results = yield category_services_1.CategoryServices.findAll({ limit, page });
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
/** create new resoruce */
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, logo } = req.body;
        const documents = {
            name,
            logo,
        };
        /** check exist name */
        const isExistName = yield category_services_1.CategoryServices.findOneByKey({ name: name });
        if (isExistName) {
            return res.status(404).json(yield (0, index_helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "name",
                        message: "Category name already exsit",
                    },
                ],
            }));
        }
        const data = yield category_services_1.CategoryServices.createResource({
            documents: documents,
        });
        res.status(201).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            message: "Category created.",
            data: data,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.store = store;
/** single resoruce */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield category_services_1.CategoryServices.findById({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: data,
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.show = show;
