function UserProfile() {
  return (
    <div className="mt-2 flex cursor-pointer items-center gap-2.5 rounded-xl border-t border-white/[0.08] px-2.5 py-3 transition hover:bg-dark-card">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-dark text-xs font-bold text-white">
        AS
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-semibold text-neutral-100">Alex Smith</div>
        <div className="truncate text-[11px] text-neutral-500">alex@example.com</div>
      </div>
      <button aria-label="User menu" className="flex shrink-0 items-center text-neutral-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}

export default UserProfile;
