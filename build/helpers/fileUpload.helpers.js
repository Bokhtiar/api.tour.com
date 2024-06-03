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
exports.ExistFileDelete = exports.FileUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imagesDir = path_1.default.join(__dirname, "../../public/uploads");
const FileUpload = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // Resize the image
    // const resizedImageBuffer = await sharp(imageBuffer)
    //   .resize(500, 500)
    //   .jpeg({ quality: 80 })
    //   .toBuffer();
    const resizedImageBuffer = yield (0, sharp_1.default)(params)
        .jpeg({ quality: 40, mozjpeg: true })
        .toBuffer();
    const filename = `${Date.now()}.jpg`;
    const outputPath = path_1.default.join(imagesDir, filename);
    fs_1.default.writeFileSync(outputPath, resizedImageBuffer);
    return filename;
});
exports.FileUpload = FileUpload;
const ExistFileDelete = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let shouldDeleteOldFile = true;
    if (shouldDeleteOldFile && data) {
        const oldImagePath = path_1.default.join(imagesDir, data);
        if (fs_1.default.existsSync(oldImagePath)) {
            fs_1.default.unlinkSync(oldImagePath);
        }
    }
});
exports.ExistFileDelete = ExistFileDelete;
