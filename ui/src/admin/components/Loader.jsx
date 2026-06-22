const Loader = ({ fullScreen = false, label = "Loading..." }) => {
  const wrapperClass = fullScreen
    ? "flex h-screen w-full items-center justify-center bg-slate-50"
    : "flex items-center justify-center py-10";

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-orange-100">
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-orange-500 border-t-transparent" />
        </div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
    </div>
  );
};

export default Loader;
