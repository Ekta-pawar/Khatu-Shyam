const Loader = ({ fullScreen = false, label = "Loading..." }) => {
  const wrapperClass = fullScreen
    ? "flex h-screen w-full items-center justify-center bg-slate-50"
    : "flex items-center justify-center py-10";

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
};

export default Loader;
