const baseInputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100";

const FormField = ({
  label,
  name,
  type = "text",
  as = "input",
  options = [],
  error,
  required = false,
  rows = 3,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea id={name} name={name} rows={rows} className={baseInputClass} {...rest} />
      ) : as === "select" ? (
        <select id={name} name={name} className={baseInputClass} {...rest}>
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} className={baseInputClass} {...rest} />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
