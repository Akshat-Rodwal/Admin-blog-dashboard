import React from "react";

const Modal = ({
    open,
    title,
    children,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1e2130] rounded-xl shadow-lg w-full max-w-md border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {title}
                    </h3>
                </div>
                <div className="px-4 py-4">{children}</div>
                <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 transition-all"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
