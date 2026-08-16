import { ChatGroq } from "@langchain/groq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { config } from "../config/index.js";

const llm = new ChatGroq({
  apiKey: config.groqApiKey,
  model: config.groqModel,
  temperature: config.groqTemperature,
  maxTokens: config.groqMaxTokens,
  maxRetries: config.groqMaxRetries,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001", 
  taskType: "RETRIEVAL_DOCUMENT",
  title: "Document title",
});




export const generateAnswer = async (context, question) => {
  const response = await llm.invoke([
    {
      role: "system",
      content: `You are a RAG-based AI assistant. Answer the user's question using only the provided context. If the answer is not in the context, say: "I don't know based on the provided documents."

Context:
${context}`,
    },
    {
      role: "human",
      content: question,
    },
  ]);


  return response.content;
};

export const getEmbeddings = () => embeddings;
