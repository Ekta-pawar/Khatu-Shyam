const variants = {
  primary: "bg-orange-600 text-white hover:bg-orange-700 disabled:bg-orange-300",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:text-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
  outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:text-slate-400",
};

const Button = ({ children, variant = "primary", isLoading = false, className = "", type = "button", ...rest }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
};

export default Button;
