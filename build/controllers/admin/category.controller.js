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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desotry = exports.update = exports.show = exports.store = exports.index = void 0;
const index_helper_1 = require("../../helpers/index.helper");
const category_services_1 = require("../../services/admin/category.services");
const pagination_helper_1 = require("../../helpers/pagination.helper");
const mongoose_1 = require("mongoose");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imagesDir = path_1.default.join(__dirname, "../../public/uploads");
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
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const { name } = req.body;
        const imageBuffer = req.file.buffer;
        // Resize the image
        const resizedImageBuffer = yield (0, sharp_1.default)(imageBuffer)
            .resize(500, 500)
            .jpeg({ quality: 80 })
            .toBuffer();
        const filename = `${Date.now()}.jpg`;
        const outputPath = path_1.default.join(imagesDir, filename);
        fs_1.default.writeFileSync(outputPath, resizedImageBuffer);
        const documents = {
            name,
            logo: filename,
        };
        const data = yield category_services_1.CategoryServices.createResource({
            documents: documents,
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
/** update resource */
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, logo } = req.body;
        const documents = {
            name,
            logo,
        };
        /* check unique name */
        const existWithName = yield category_services_1.CategoryServices.findOneByKey({ name });
        if (existWithName && existWithName._id.toString() !== id) {
            return res.status(409).json(yield (0, index_helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Name",
                        message: "Category name already exists.",
                    },
                ],
            }));
        }
        const data = yield category_services_1.CategoryServices.updateResource({
            _id: new mongoose_1.Types.ObjectId(id),
            documents: documents,
        });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: data,
            message: "Category updated",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
/** resource desotry */
const desotry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield category_services_1.CategoryServices.destoryResource({
            _id: new mongoose_1.Types.ObjectId(id),
        });
        res.status(200).json(yield (0, index_helper_1.HttpSuccessResponse)({
            status: true,
            data: data,
            message: "Category deleted",
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.desotry = desotry;
