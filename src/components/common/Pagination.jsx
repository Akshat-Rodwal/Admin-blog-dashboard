import React from "react";

const Pagination = ({
    currentPage,
    totalItems,
    perPage,
    onPageChange,
    onPerPageChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const changePage = (p) => {
        const next = Math.min(Math.max(1, p), totalPages);
        onPageChange(next);
    };

    return (
        <div className="flex items-center justify-between bg-white dark:bg-[#1e2130] rounded-lg border border-slate-200 dark:border-slate-800 p-3 shadow-sm transition-colors">
            <div className="flex items-center space-x-2">
                <button
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 transition-all"
                    onClick={() => changePage(currentPage - 1)}
                    disabled={!canPrev}
                >
                    Prev
                </button>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 transition-all"
                    onClick={() => changePage(currentPage + 1)}
                    disabled={!canNext}
                >
                    Next
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                    Per page:
                </span>
                <select
                    className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1a1d2d] text-slate-700 dark:text-slate-200 rounded-lg px-2 py-1 text-sm"
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
