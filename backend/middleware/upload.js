import multer from "multer";
import path from "path";
import { config } from "../config/index.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadsDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${Date.now()}-${safeName}`);
  },
});



export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, 
});
