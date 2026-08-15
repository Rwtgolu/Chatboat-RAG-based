import { useState } from "react";
import Sidebar       from "./components/Sidebar/Sidebar";
import HeroSection   from "./components/Main/HeroSection";
import UploadSection from "./components/Main/UploadSection";
import FeatureCards  from "./components/Main/FeatureCards";
import QuestionForm  from "./components/Main/QuestionForm";
import AnswerPanel   from "./components/Main/AnswerPanel";

const API_URL    = "/ai";
const UPLOAD_URL = "/upload-pdf";

function App() {
  const [activeNav,setActiveNav]=useState("ask");
  const [selectedFile,setSelectedFile]= useState(null);
  const [uploadedFileName,setUploadedFileName]= useState("");
  const [uploading,setUploading]= useState(false);
  const [question,setQuestion]= useState("");
  const [answer,setAnswer]= useState("");
  const [loading,setLoading]= useState(false);
  const [error,setError]= useState("");
  const [status,setStatus]= useState("");

  const handleFileSelect = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File size must be under 50MB.");
      return;
    }
    setSelectedFile(file);
    setUploadedFileName("");
    setAnswer("");
    setError("");
    setStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    setUploading(true);
    setError("");
    setStatus("");
    setAnswer("");
    try {
      const response = await fetch(UPLOAD_URL, { method: "POST", body: formData });
      if (!response.ok) throw new Error("PDF upload failed.");
      const data = await response.json();
      if (!data.success) throw new Error("PDF upload failed.");
      setUploadedFileName(data.data.fileName || selectedFile.name);
      setStatus(`${data.message} ${data.data.chunks || 0} chunks created.`);
    } catch (err) {
      setError(err.message || "Failed to upload PDF.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !uploadedFileName) return;
    setLoading(true);
    setError("");
    setAnswer("");
    setStatus("");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: question}),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Something went wrong.");
      }
      const data = await response.json();
      if (!data.success) throw new Error(data.error || "Something went wrong.");
      setAnswer(data.data.answer || "No answer returned.");
    } catch (err) {
      setError(err.message || "Failed to get an answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      <main className="flex flex-1 flex-col gap-5 overflow-y-auto bg-dark-base px-8 py-7 scrollbar-thin">
        <HeroSection />

        <UploadSection
          selectedFile={selectedFile}
          uploadedFileName={uploadedFileName}
          uploading={uploading}
          status={status}
          error={error}
          onFileSelect={handleFileSelect}
          onUpload={handleUpload}
        />

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8"  x2="12"    y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        <FeatureCards />

        <QuestionForm
          question={question}
          loading={loading}
          uploadedFileName={uploadedFileName}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
        />

        <AnswerPanel answer={answer} loading={loading} />
      </main>
    </div>
  );
}

export default App;
