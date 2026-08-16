import { useState } from "react";

function QuestionForm({ question, loading, uploadedFileName, onQuestionChange, onSubmit }) {
  const [showTips, setShowTips] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-dark-card p-5">
      <p className="text-sm font-semibold text-neutral-100">Ask a question about your document</p>

      <textarea
        value={question}
        onChange={(e) => onQuestionChange(e.target.value)}
        placeholder="Type your question here..."
        rows={3}
        className="min-h-[90px] w-full resize-y rounded-xl border border-white/[0.08] bg-dark-input px-4 py-3.5 text-sm text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/25"
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowTips((v) => !v)}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-dark-input px-3.5 py-2 text-xs font-medium text-neutral-400 transition hover:bg-dark-hover hover:text-neutral-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Tips
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <button
          type="submit"
          disabled={loading || !uploadedFileName || !question.trim()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-orange to-orange-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(232,93,4,0.25)] transition hover:-translate-y-px hover:opacity-90 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          {loading ? "Thinking…" : "Ask Question"}
        </button>
      </div>

      {showTips && (
        <div className="animate-fadeIn rounded-xl border border-white/10 bg-dark-input p-4">
          <ul className="flex flex-col gap-1.5">
            {[
              "Be specific — ask about a particular section or topic.",
              "Use complete sentences for better results.",
              'Try "Summarize the key points" for an overview.',
              "Upload the PDF first, then ask your question.",
            ].map((tip) => (
              <li key={tip} className="relative pl-3.5 text-xs text-neutral-400 before:absolute before:left-0 before:text-orange before:content-['→']">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default QuestionForm;
