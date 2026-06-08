const EmptyState = ({ title = "Nothing here yet", description = "", action = null }) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
    <p className="text-base font-semibold text-slate-700">{title}</p>
    {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
