import { useRef, useState } from "react";

function UploadSection({ selectedFile, uploadedFileName, uploading, status, error, onFileSelect, onUpload }) {
  const [dragOver, setDragOver] = useState(false);
  const dropInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => onFileSelect(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    onFileSelect(e.dataTransfer.files[0]);
  };

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-white/[0.08] bg-dark-card p-6">
      <div
        onClick={() => dropInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed p-7 text-center transition-all
          ${dragOver
            ? "border-orange bg-orange/10"
            : selectedFile && !uploadedFileName
              ? "border-green-500 bg-green-500/5"
              : "border-orange/35 bg-orange/[0.03] hover:border-orange hover:bg-orange/10"
          }`}
      >
        <input ref={dropInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
        <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="1.8" width="40" height="40">
          <polyline points="16 16 12 12 8 16" />
          <line x1="12" y1="12" x2="12" y2="21" />
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
        </svg>
        {selectedFile ? (
          <>
            <p className="text-sm font-semibold text-neutral-100">{selectedFile.name}</p>
            <p className="text-xs text-neutral-400">Ready to upload</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-neutral-100">Drag &amp; drop your PDF here</p>
            <p className="text-xs text-neutral-400">
              or <span className="cursor-pointer text-orange-light underline">click to browse</span>
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 px-5 text-[11px] font-semibold text-neutral-500">
        <div className="h-10 w-px bg-white/[0.08]" />
        <span>OR</span>
        <div className="h-10 w-px bg-white/[0.08]" />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-neutral-100">Select PDF file</p>

        <div className="flex flex-wrap items-stretch gap-3">
          <label className="flex min-w-[160px] flex-1 cursor-pointer overflow-hidden rounded-lg border border-white/10">
            <span className="border-r border-white/10 bg-[#2a2a2a] px-3.5 py-2 text-xs font-semibold text-neutral-100 transition hover:bg-[#333] whitespace-nowrap">
              Choose File
            </span>
            <span className="flex-1 truncate bg-dark-input px-3 py-2 text-xs text-neutral-400">
              {selectedFile ? selectedFile.name : "No file chosen"}
            </span>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
          </label>

          <button
            onClick={onUpload}
            disabled={uploading || !selectedFile || !!uploadedFileName}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-br from-orange to-orange-dark px-5 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(232,93,4,0.25)] transition hover:-translate-y-px hover:opacity-90 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
            {uploading ? "Uploading…" : "Upload PDF"}
          </button>
        </div>

        <p className="text-[11px] text-neutral-500">Only PDF files are supported (Max 50MB)</p>

        {status && !error && (
          <div className="rounded-lg border border-green-500/25 bg-green-500/10 px-3 py-2 text-xs text-green-400">
            ✓ {status}
          </div>
        )}
        {uploadedFileName && (
          <div className="rounded-lg border border-green-500/25 bg-green-500/10 px-3 py-2 text-xs text-green-400">
            ✓ Uploaded: {uploadedFileName}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadSection;
