const variants = {
  primary: "bg-linear-to-r from-yellow-200 to-yellow-500 text-black shadow-sm shadow-orange-200 hover:from-yellow-300 hover:to-yellow-600 hover:shadow-md disabled:from-yellow-100 disabled:to-yellow-300",
  secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:text-slate-400",
  danger: "bg-red-600 text-white shadow-sm shadow-red-200 hover:bg-red-700 disabled:bg-red-300",
  outline: "border border-slate-300 bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 disabled:text-slate-400",
};

const Button = ({ children, variant = "primary", isLoading = false, className = "", type = "button", bgColor = "", hoverColor = "", textColor = "", ...rest }) => {
  const colorOverride = [bgColor, hoverColor, textColor].filter(Boolean).join(" ");
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:shadow-none ${colorOverride || variants[variant]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      {children}
    </button>
  );
};

export default Button;
