const EmptyState = ({ title = "Nothing here yet", description = "", action = null }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/90 px-6 py-16 text-center shadow-sm">
    <div className="h-12 w-12 rounded-2xl bg-orange-50 ring-1 ring-orange-100" />
    <p className="text-base font-semibold text-slate-800">{title}</p>
    {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
