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
exports.CategoryServices = void 0;
const category_models_1 = require("../../models/category.models");
/** count documents */
const countAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.countDocuments();
});
/** find all resource */
const findAll = ({ limit, page, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.find()
        .sort({ _id: -1 })
        .skip(page * limit - limit)
        .limit(limit)
        .exec();
});
/** find one key */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.findOne(Object.assign({}, params));
});
/** find by id */
const findById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.findById(_id);
});
/** create new resource */
const createResource = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = new category_models_1.Category({
        name: documents === null || documents === void 0 ? void 0 : documents.name,
        logo: documents === null || documents === void 0 ? void 0 : documents.logo,
    });
    return yield newCategory.save();
});
/** resource update */
const updateResource = ({ _id, documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.findByIdAndUpdate(_id, {
        name: documents === null || documents === void 0 ? void 0 : documents.name,
        logo: documents === null || documents === void 0 ? void 0 : documents.logo,
    });
});
/** resource delete */
const destoryResource = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_models_1.Category.findByIdAndRemove(_id);
});
/* Search by key */
const searchByKey = ({ query, }) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRegExp = new RegExp(query, "i");
    return yield category_models_1.Category.find({
        $or: [{ name: queryRegExp }],
    });
});
exports.CategoryServices = {
    findAll,
    countAll,
    findById,
    searchByKey,
    findOneByKey,
    createResource,
    updateResource,
    destoryResource,
};
