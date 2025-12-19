import React from "react";

const Select = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    className = "",
    ...props
}) => {
    const selectId = `select-${name}`;
    const hasError = !!error;

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={`block text-sm font-medium mb-1 ${
                        hasError
                            ? "text-red-600"
                            : "text-slate-700 dark:text-slate-300"
                    }`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <select
                    id={selectId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
            block w-full pl-3 pr-10 py-2 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 transition-all
            ${
                hasError
                    ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500"
                    : "border-slate-300 focus:ring-primary focus:border-primary dark:border-slate-700"
            }
            ${
                disabled
                    ? "bg-slate-100 dark:bg-slate-900"
                    : "bg-white dark:bg-[#1e2130]"
            }
            text-slate-900 dark:text-slate-200
          `}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {hasError ? (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            ) : helperText ? (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
};

export default Select;
