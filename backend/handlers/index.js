import { indexPdfFile } from "../services/pdfProcessor.js";
import { similaritySearch } from "../services/vectorStore.js";
import { generateAnswer } from "../services/aiService.js";
import { response } from "express";

export const getHealth = (req, res) => {
  console.log("hey");
  res.status(200).json({ message: "Document Chatbot RAG server is running." });
};

export const uploadPdfHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded." });
    }
    const chunks = await indexPdfFile(req.file.path);
    return res.status(200).json({
      success: true,
      message: "PDF uploaded and indexed successfully.",
       data: {
        fileName: req.file.originalname,
        chunks,
      },
     
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, error:  "Upload failed." });
  }
};

export const aiHandler = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || !input.trim()) {
      return res.status(400).json({ success: false, error: "Input question is required." });
    }

    const docs = await similaritySearch(input);
    const context = docs.map((doc) => doc.pageContent).join("\n\n");
    const answer = await generateAnswer(context, input);


    return res.json({
      success: true,
      data: { answer },
    });
  } catch (error) {
    console.error("AI error:", error);
    return res.status(500).json({ success: false, error: "ai error "});
  }
};
