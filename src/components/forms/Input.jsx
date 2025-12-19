import React from "react";

const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    className = "",
    ...props
}) => {
    const inputId = `input-${name}`;
    const hasError = !!error;

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
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
                <input
                    id={inputId}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
            block w-full px-3 py-2 border-2 ${
                hasError
                    ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    : "border-white dark:border-slate-700 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            } rounded-md shadow-sm ${disabled ? 'bg-gray-100' : 'bg-white dark:bg-slate-800'} dark:text-white dark:placeholder-slate-400 transition-colors`}
                    {...props}
                />
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

export default Input;
