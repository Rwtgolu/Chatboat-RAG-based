import { QdrantVectorStore } from "@langchain/qdrant";
import { config } from "../config/index.js";
import { getEmbeddings } from "./aiService.js";


let store = null;

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

  store = await QdrantVectorStore.fromDocuments(documents, getEmbeddings(), {
    url: config.qdrantUrl,
    apiKey: config.qdrantApiKey,
    collectionName: config.collectionName,
  });
  return store;
};

export const similaritySearch = async (query, k = config.similaritySearchK) => {
  const store = await getVectorStore();
  return store.similaritySearch(query, k);
};
