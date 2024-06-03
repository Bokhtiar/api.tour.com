import fs from "fs";
import path from "path";
import sharp from "sharp";
const imagesDir = path.join(__dirname, "../../public/uploads");


export const FileUpload = async (params: any) => {
  // Resize the image
  // const resizedImageBuffer = await sharp(imageBuffer)
  //   .resize(500, 500)
  //   .jpeg({ quality: 80 })
  //   .toBuffer();
  
  const resizedImageBuffer = await sharp(params)
    .jpeg({ quality: 40, mozjpeg: true })
    .toBuffer();

  const filename = `${Date.now()}.jpg`;
  const outputPath = path.join(imagesDir, filename);
  fs.writeFileSync(outputPath, resizedImageBuffer);

  return filename;
};

export const ExistFileDelete= async(data:any) => {
  let shouldDeleteOldFile = true;
    if (shouldDeleteOldFile && data) {
      const oldImagePath = path.join(imagesDir, data);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
}