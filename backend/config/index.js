import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  uploadsDir: path.join(process.cwd(), "uploads"),
  

  groqApiKey: process.env.GROQ_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
  qdrantApiKey: process.env.QDRANT_API_KEY,
  qdrantUrl: process.env.QDRANT_URL,
  
 cohereApiKey: process.env.COHERE_API_KEY,
  retrieveK: 25,      
  rerankTopN: 5, 

  groqModel: "openai/gpt-oss-120b",
  groqTemperature: 0,
  groqMaxTokens: 1024,
  groqMaxRetries: 2,
  
  collectionName: "gaurav",
  

  chunkSize: 500,
  chunkOverlap: 100,
  

  similaritySearchK: 5,
};

export const validateConfig = () => {
  const requiredKeys = [
    "groqApiKey",
    "googleApiKey", 
    "qdrantApiKey",
    "qdrantUrl"
  ];
  
  const missingKeys = requiredKeys.filter(key => !config[key]);
  
  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(", ")}`);
  }
};