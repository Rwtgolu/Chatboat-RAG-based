import { QdrantVectorStore } from "@langchain/qdrant";
import { CohereClient } from "cohere-ai";
import { config } from "../config/index.js";
import { getEmbeddings } from "./aiService.js";

let store = null;
const cohere = new CohereClient({ token: config.cohereApiKey });

const getVectorStore = async () => {
  if (store) return store;

  store = await QdrantVectorStore.fromExistingCollection(getEmbeddings(), {
    url: config.qdrantUrl,
    apiKey: config.qdrantApiKey,
    collectionName: config.collectionName,
  });

  return store;
};

export const addDocuments = async (documents) => {
  const vectorStore = await getVectorStore();
  await vectorStore.addDocuments(documents);
  return vectorStore;
};

// Wide retrieval — pull more candidates than you'll actually use
export const similaritySearch = async (query, k = config.similaritySearchK) => {
  const vectorStore = await getVectorStore();
  return vectorStore.similaritySearch(query, k);
};

// Re-rank a set of LangChain Document objects against the query
export const rerankDocuments = async (query, documents, topN = config.rerankTopN || 5) => {
  if (documents.length === 0) return [];

  const response = await cohere.rerank({
    model: "rerank-v3.5",
    query,
    documents: documents.map((doc) => doc.pageContent),
    topN,
  });

  // Map reranked indices back to original Document objects (with metadata intact)
  return response.results.map((r) => ({
    ...documents[r.index],
    pageContent: documents[r.index].pageContent,
    metadata: documents[r.index].metadata,
    relevanceScore: r.relevanceScore,
  }));
};

// Combined retrieve + rerank — this is what your QA endpoint should call
export const retrieveAndRerank = async (
  query,
  retrieveK = config.retrieveK || 25,
  rerankTopN = config.rerankTopN || 5
) => {
  const candidates = await similaritySearch(query, retrieveK);
  return rerankDocuments(query, candidates, rerankTopN);
};