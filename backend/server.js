import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { config, validateConfig } from "./config/index.js";
import { upload } from "./middleware/upload.js";
import { aiHandler, getHealth, uploadPdfHandler } from "./handlers/index.js";

validateConfig();

fs.mkdirSync(config.uploadsDir, { recursive: true });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", getHealth);
app.post("/upload-pdf", upload.single("pdf"), uploadPdfHandler);
app.post("/ai", aiHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
