import React, { forwardRef } from "react";

const Textarea = forwardRef(({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    error = "",
    helperText = "",
    required = false,
    disabled = false,
    rows = 4,
    className = "",
    ...props
}, ref) => {
    const textareaId = `textarea-${name}`;
    const hasError = !!error;

    const handleKeyDown = (e) => {
        // Allow tab key to insert spaces instead of moving focus
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = value.substring(0, start) + '    ' + value.substring(end);
            
            // Trigger the onChange event
            const event = {
                target: {
                    name: name,
                    value: newValue
                }
            };
            onChange(event);
            
            // Set cursor position after the inserted spaces
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
        
        // Call the original onKeyDown if provided
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    };

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label
                    htmlFor={textareaId}
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
                <textarea
                    id={textareaId}
                    ref={ref}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={rows}
                    className={`block w-full px-3 py-2 border-2 ${
                        hasError
                            ? "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                            : "border-white dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-md shadow-sm ${disabled ? 'bg-gray-100 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'} transition-colors font-mono text-sm`}
                    style={{ minHeight: `${rows * 1.5}rem` }}
                    {...props}
                />
            </div>

            {hasError ? (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : helperText ? (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {helperText}
                </p>
            ) : null}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
