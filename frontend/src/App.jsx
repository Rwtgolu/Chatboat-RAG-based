import { useState } from "react";

const API_URL = "/ai";
const UPLOAD_URL = "/upload-pdf";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [documentId, setDocumentId] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file || null);
    setUploadedFileName("");
    setDocumentId("");
    setAnswer("");
    setError("");
    setStatus("");

    if (file && file.type !== "application/pdf") {
      setSelectedFile(null);
      setError("Only PDF files are allowed.");
    }
  };

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    setUploading(true);
    setError("");
    setStatus("");
    setAnswer("");

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });


      if (!response.ok) {
        throw new Error("PDF upload failed.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error( "PDF upload failed.");
      }

      setDocumentId(data.data.documentId);
      setUploadedFileName(data.data.fileName || selectedFile.name);

      setStatus(
        `${data.message} ${data.data.chunks || 0} chunks created.`
      );
    } catch (err) {
      setError(err.message || "Failed to upload PDF.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setAnswer("");
    setStatus("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: question,
          documentId: documentId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.data.answer || "No answer returned.");

    } catch (err) {
      setError(err.message || "Failed to get an answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="chat-card">

        <header className="header">
          <div>
            <p className="eyebrow">Document Assistant</p>
            <h1>Ask your PDF</h1>
          </div>
        </header>

        <div className="upload-box">

          <label htmlFor="pdf-upload" className="upload-label">
            Select PDF
          </label>

          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="secondary-btn"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

          {uploadedFileName && (
            <p className="file-name">
              Uploaded: {uploadedFileName}
            </p>
          )}

        </div>

        {status && !error && (
          <div className="message success">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="prompt-form">

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="5"
            placeholder="Ask a question about the uploaded document..."
          />

          <button
            type="submit"
            disabled={loading || !uploadedFileName}
          >
            {loading ? "Thinking..." : "Ask Question"}
          </button>

        </form>

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        <div className="answer-box">

          <h2>Answer</h2>

          {answer ? (
            <p>{answer}</p>
          ) : (
            <p className="placeholder">
              Your answer will appear here.
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;