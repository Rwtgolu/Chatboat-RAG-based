const FEATURES = [
  {
    id: "secure",
    title: "Secure & Private",
    desc: "Your documents are encrypted and never shared.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    id: "instant",
    title: "Instant Answers",
    desc: "Get accurate answers from your documents in seconds.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" width="22" height="22"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
  {
    id: "smart",
    title: "Smart & Accurate",
    desc: "AI understands context and provides precise responses.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" width="22" height="22"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" /><line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" /></svg>,
  },
];

function FeatureCards() {
  return (
    <div className="grid grid-cols-3 gap-3.5">
      {FEATURES.map((f) => (
        <div
          key={f.id}
          className="flex items-start gap-3.5 rounded-2xl border border-white/[0.08] bg-dark-card p-4 transition hover:border-orange/30 hover:bg-dark-hover"
        >
          <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-orange/20 bg-orange/10">
            {f.icon}
          </div>
          <div>
            <div className="mb-1 text-sm font-bold text-neutral-100">{f.title}</div>
            <p className="text-xs leading-relaxed text-neutral-400">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;
