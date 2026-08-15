function UpgradeCard() {
  return (
    <div className="mt-3 rounded-2xl border border-orange/30 bg-gradient-to-br from-[#1e1200] to-[#2a1800] p-4">
      <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-orange/20 bg-orange/10 text-orange-light">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M2 19h20v2H2v-2zM2 5l5 8 5-6 5 6 5-8v12H2V5z" />
        </svg>
      </div>
      <div className="mb-1.5 text-sm font-bold text-orange-light">Upgrade to Pro</div>
      <p className="mb-3.5 text-xs leading-relaxed text-neutral-400">
        Upload more PDFs and get faster, smarter answers.
      </p>
      <button className="w-full rounded-xl bg-gradient-to-br from-orange to-orange-dark px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(232,93,4,0.25)] transition hover:-translate-y-px hover:opacity-90">
        Upgrade Now →
      </button>
    </div>
  );
}

export default UpgradeCard;
