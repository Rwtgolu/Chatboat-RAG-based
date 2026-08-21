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

export const similaritySearch = async (query, k = config.similaritySearchK) => {
  const vectorStore = await getVectorStore();
  return vectorStore.similaritySearch(query, k);
};


export const rerankDocuments = async (query, documents, topN = 10) => {
  if (documents.length === 0) return [];

  const response = await cohere.rerank({
    model: "rerank-v3.5",
    query,
    documents: documents.map((doc) => doc.pageContent),
    topN,
  });


  return response.results.map((r) => ({
    ...documents[r.index],
    pageContent: documents[r.index].pageContent,
    metadata: documents[r.index].metadata,
    relevanceScore: r.relevanceScore,
  }));
};

export const retrieveAndRerank = async (
  query,
  retrieveK = 25,
  rerankTopN =  5
) => {
  const candidates = await similaritySearch(query, retrieveK);
  return rerankDocuments(query, candidates, rerankTopN);
};