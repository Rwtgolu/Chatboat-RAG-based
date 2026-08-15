function HeroSection() {
  return (
    <div className="flex items-center justify-between gap-5">
      <div>
        <span className="mb-3 inline-block rounded-full border border-orange/30 bg-orange/20 px-3 py-1 text-[11px] font-bold tracking-widest text-orange-light">
          ASK YOUR PDF
        </span>
        <h1 className="mb-2.5 text-4xl font-extrabold leading-tight text-neutral-100">
          Ask anything about your{" "}
          <span className="text-orange-light">PDF</span>
        </h1>
        <p className="text-sm text-neutral-400">
          Upload your document and get instant, accurate answers.
        </p>
      </div>

      <div className="shrink-0">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-orange/15 bg-[radial-gradient(circle,rgba(232,93,4,0.12)_0%,transparent_70%)]">
          <div className="drop-shadow-[0_8px_24px_rgba(232,93,4,0.4)] -rotate-[5deg]">
            <svg viewBox="0 0 80 90" fill="none" width="70">
              <rect width="70" height="85" rx="8" fill="#E85D04" />
              <rect x="8" y="20" width="40" height="6" rx="3" fill="white" opacity="0.9" />
              <rect x="8" y="33" width="54" height="6" rx="3" fill="white" opacity="0.9" />
              <rect x="8" y="46" width="46" height="6" rx="3" fill="white" opacity="0.9" />
              <rect x="8" y="59" width="30" height="6" rx="3" fill="white" opacity="0.7" />
              <rect x="48" y="0" width="22" height="22" fill="#C44A00" />
              <path d="M48 0 L70 22 L48 22 Z" fill="#E85D04" opacity="0.6" />
            </svg>
          </div>

          <div className="absolute bottom-[18px] right-2.5 flex items-center gap-1 rounded-[10px] border border-white/10 bg-[#2a2a2a] px-2.5 py-1.5 shadow-lg">
            <span className="block h-1.5 w-1.5 rounded-full bg-neutral-500" />
            <span className="block h-1.5 w-1.5 rounded-full bg-neutral-500" />
            <span className="block h-1.5 w-1.5 rounded-full bg-neutral-500" />
          </div>

          <span className="absolute right-7 top-4 animate-sparkle text-[11px] text-orange opacity-70">✦</span>
          <span className="absolute left-2.5 top-10 animate-[sparkle_2s_ease-in-out_0.6s_infinite_alternate] text-[9px] text-orange opacity-70">✦</span>
          <span className="absolute bottom-10 left-4 animate-[sparkle_2s_ease-in-out_1.2s_infinite_alternate] text-[11px] text-orange opacity-70">✦</span>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
