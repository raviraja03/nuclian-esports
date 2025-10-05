import multer from "multer";
import { v4 as uuid } from "uuid";
import "dotenv/config";
import { CustomError } from "../middleware/errorMiddleware.js";
import cloudinary from "../config/cloudinary.js";
const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new CustomError("Only images are allowed", 400), false);
    }
    cb(null, true);
  },
});

export const multerMiddleware = multerUpload.single("thumbnail");

export const UploadToCloudnary = async (file) => {
  const filePromise = file.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "tribex",
            resource_type: "image",
            public_id: `${uuid()}`,
            transformation: [{ quality: "auto", fetch_format: "auto" }], // ✅ optimize on upload
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(file.buffer);
    });
  });

  try {
    const result = await Promise.all(filePromise);
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new CustomError(
      error.message || "An error occurred while uploading files",
      500
    );
  }
};

export const DeleteFromCloudnary = async (public_ids) => {
  const deletePromises = public_ids.map((public_id) => {
    
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  });

  try {
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    throw new CustomError(
      error.message || "An error occurred while deleting files",
      500
    );
  }
};
