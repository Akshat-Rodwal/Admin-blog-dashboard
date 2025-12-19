import React from "react";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className = "",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 active:scale-95";

    const variants = {
        primary:
            "bg-primary text-white hover:shadow-md hover:opacity-95 focus:ring-primary",
        secondary:
            "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline:
            "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-primary dark:bg-[#1a1d2d] dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-primary dark:text-slate-200 dark:hover:bg-slate-800",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledStyles : ""}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
