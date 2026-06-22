const palettes = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  green: "bg-green-100 text-green-700 ring-green-200",
  red: "bg-red-100 text-red-700 ring-red-200",
  yellow: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  blue: "bg-blue-100 text-blue-700 ring-blue-200",
  orange: "bg-orange-100 text-orange-700 ring-orange-200",
};

const Badge = ({ children, color = "slate" }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ${palettes[color]}`}>
    {children}
  </span>
);

export default Badge;
