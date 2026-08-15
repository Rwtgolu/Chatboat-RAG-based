function AnswerPanel({ answer, loading }) {
  const handleCopy = () => {
    if (answer) navigator.clipboard.writeText(answer);
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-dark-card p-5 mb-1">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-base font-bold text-orange-light">
          <svg viewBox="0 0 24 24" fill="#E85D04" width="18" height="18">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Answer
        </div>
        <button
          onClick={handleCopy}
          disabled={!answer}
          title="Copy answer"
          aria-label="Copy answer to clipboard"
          className="rounded-lg p-1.5 text-neutral-500 transition hover:bg-dark-hover hover:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>
      </div>

      <div className="min-h-12">
        {loading ? (
          <div className="flex items-center gap-1.5 py-1">
            {[0, 200, 400].map((delay) => (
              <span
                key={delay}
                style={{ animationDelay: `${delay}ms` }}
                className="block h-2 w-2 rounded-full bg-orange animate-dot"
              />
            ))}
          </div>
        ) : answer ? (
          <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-100">{answer}</p>
        ) : (
          <p className="text-sm text-neutral-500">Your answer will appear here...</p>
        )}
      </div>
    </div>
  );
}

export default AnswerPanel;
