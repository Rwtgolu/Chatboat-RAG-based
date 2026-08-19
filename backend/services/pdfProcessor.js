import fs from "fs";
import { createRequire } from "module";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { addDocuments } from "./vectorStore.js";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const extractText = async (pdfPath) => {
  console.log("Extracting text from:", pdfPath);
  const buffer = fs.readFileSync(pdfPath);

  const result = await pdfParse(buffer);


  if (!result.text) {
    throw new Error("Failed to extract text from PDF");
  }
  return result.text;
};

const chunkText = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const documents = await splitter.createDocuments([text]);

  if (documents.length === 0) {
    throw new Error("No chunks were created from the PDF");
  }

  return documents;
};

export const indexPdfFile = async (pdfPath) => {
  const text = await extractText(pdfPath);
  // console.log("text complete")
  const documents = await chunkText(text);
  // console.log("document complete")
  await addDocuments(documents);
  // console.log("document add")
  return documents.length;
};
