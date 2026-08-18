import NavItem from "./NavItem";
import UserProfile from "./UserProfile";

const NAV_ITEMS = [
  {
    id: "ask", label: "Ask PDF",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  }
];

function Sidebar({ activeNav, onNavChange }) {
  return (
    <aside className="flex w-[260px] min-w-[260px] flex-col overflow-y-auto border-r border-white/[0.08] bg-dark-sidebar px-4 py-5 gap-1.5 scrollbar-thin">
      <div className="flex items-center gap-3 px-1.5 pb-4">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-[10px]">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <rect width="24" height="24" rx="6" fill="#E85D04" />
            <path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="16" r="3" fill="white" />
            <path d="M17 16h2M18 15v2" stroke="#E85D04" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <div className="text-base font-bold leading-tight text-neutral-100">DocAssistant</div>
          <div className="text-[11px] font-medium text-orange-light">AI Powered</div>
        </div>
      </div>

      <div className="mb-2.5 h-px bg-white/[0.08]" />

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            active={activeNav === item.id}
            onClick={onNavChange}
          />
        ))}
      </nav>

      <UserProfile />
    </aside>
  );
}

export default Sidebar;
