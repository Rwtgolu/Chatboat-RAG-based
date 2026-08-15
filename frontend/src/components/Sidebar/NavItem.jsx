function NavItem({ id, label, active, onClick, icon }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left
        ${active
          ? "bg-gradient-to-br from-orange to-orange-dark text-white shadow-[0_4px_16px_rgba(232,93,4,0.25)]"
          : "text-neutral-400 hover:bg-dark-card hover:text-neutral-100"
        }`}
    >
      <span className="flex items-center justify-center w-[18px] h-[18px] shrink-0">
        {icon}
      </span>
      {label}
    </button>
  );
}

export default NavItem;
