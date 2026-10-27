import { fileTypeFromFile } from "file-type";
import fs from "node:fs/promises";
import path from "node:path";
import { ApplicationException } from "../Utils/Security/ErrorException/error.exception.js";
export const magicNumberMiddleware = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const result = await fileTypeFromFile(req.file.path);
  console.log({result});
  
    const originalExtension = path.extname(req.file.originalname).toLowerCase();

    if (!result || `.${result.ext}` !== originalExtension) {
      await fs.unlink(req.file.path);

      return next(
        ApplicationException({
          message: "Invalid file content or extension",
        }),
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
