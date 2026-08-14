# Document Chatbot RAG

A full-stack chatbot application that lets users upload documents and ask
questions about their content. The system uses **Retrieval-Augmented Generation (RAG)** powered by 
**LangChain** to retrieve relevant context from uploaded documents and generate accurate, grounded answers.

## Features

-  Upload and process documents (PDF)
-  Semantic search over document content using vector embeddings
-  Conversational chatbot interface with context-aware responses
-  RAG pipeline built with LangChain for accurate, source-grounded answers
-  Fast, responsive React-based frontend
-  Chat history and multi-document support

## Tech Stack

**Frontend**
- React (JavaScript)
- CSS / component-based styling

**Backend**
- Node.js
- LangChain (JS)
- Retrieval-Augmented Generation (RAG) pipeline
- Vector database for embeddings (e.g., Pinecone / Chroma / FAISS)
- LLM provider (e.g., OpenAI / Anthropic API)



## How It Works

1. **Document Upload** – The user uploads a document via the React frontend.
2. **Chunking & Embedding** – The backend splits the document into chunks and generates vector embeddings using LangChain.
3. **Vector Storage** – Embeddings are stored in a vector database for fast similarity search.
4. **Query & Retrieval** – When a user asks a question, the backend retrieves the most relevant document chunks based on semantic similarity.
5. **Generation** – The retrieved context is passed to the LLM along with the user's query to generate a grounded, accurate response.
6. **Response** – The answer is sent back to the frontend and displayed in the chat interface.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API key for your chosen LLM provider (e.g., OpenAI)
- Vector database setup (local or cloud)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/document-chatbot-rag.git
   cd document-chatbot-rag
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables

   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   OPENAI_API_KEY=your_api_key_here
   VECTOR_DB_URL=your_vector_db_url
   ```

### Running the App

**Start the backend server**
```bash
cd backend
npm start
```

**Start the frontend**
```bash
cd frontend
npm run dev
```


## API Endpoints

| Method | Endpoint         | Description                          |
|--------|------------------|---------------------------------------|
| POST   | `/api/upload`    | Upload a document for processing      |
| POST   | `/api/chat`      | Send a query and receive a RAG response |

## Future Improvements

- Support for multi-turn conversation memory
- Streaming responses for faster perceived performance
- Authentication and per-user document storage
- Support for additional file types (images, spreadsheets)
- Citation highlighting for source-grounded answers
-Improvement in frontend ui
- login and sigup based and history save
- improving the rag and llm ans
- Use diffrent way of chunkking and better prompt for llm
- 
