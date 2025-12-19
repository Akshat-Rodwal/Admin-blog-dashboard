import { useEffect } from "react";

// Persist current page and perPage across sessions
export const usePaginationPersistence = ({
    currentPage,
    perPage,
    setCurrentPage,
    setPerPage,
    storageKey = "pagination",
}) => {
    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            try {
                const { page, size } = JSON.parse(raw);
                if (page) setCurrentPage(page);
                if (size) setPerPage(size);
            } catch {
                void 0;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem(
            storageKey,
            JSON.stringify({ page: currentPage, size: perPage })
        );
    }, [currentPage, perPage, storageKey]);
};
