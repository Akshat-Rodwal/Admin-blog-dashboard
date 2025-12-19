import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiFilter, FiX, FiPlus } from "react-icons/fi";
import { useApp } from "../../hooks/useApp";
import BlogCard from "../../components/blog/BlogCard";
import Button from "../../components/common/Button";
import Select from "../../components/forms/Select";
import Pagination from "../../components/common/Pagination";
import { usePaginationPersistence } from "../../hooks/usePagination";

const BlogList = () => {
    const {
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        categories,
        deleteBlog,
        getFilteredAndSortedBlogs,
        getPaginatedBlogs,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        counts,
    } = useApp();

    const [showFilters, setShowFilters] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    usePaginationPersistence({
        currentPage,
        perPage,
        setCurrentPage,
        setPerPage,
        storageKey: "blogs_pagination",
    });

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(localSearchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [localSearchTerm, setSearchTerm]);

    // Get filtered blogs
    const filteredBlogs = getFilteredAndSortedBlogs();
    const pageItems = getPaginatedBlogs(filteredBlogs, currentPage, perPage);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            category: "",
            status: "",
            sortBy: "newest",
        });
        setLocalSearchTerm("");
        setCurrentPage(1);
    };

    // Handle delete blog
    const handleDeleteBlog = (id) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            deleteBlog(id);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg
                            className="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700 dark:text-red-300">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with search and add button */}
            <div className="sm:flex sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Blog Posts
                </h2>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Showing {pageItems.length} of {filteredBlogs.length} results
                    • Published {counts.published} • Draft {counts.draft}
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link to="/blogs/new">
                        <Button variant="primary">
                            <FiPlus className="mr-2 h-4 w-4" />
                            New Blog Post
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search and filter bar */}
            <div className="bg-white dark:bg-[#1e2130] shadow rounded-xl p-4 space-y-4 border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-[#1a1d2d] placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all"
                            placeholder="Search by title or author..."
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center"
                        >
                            <FiFilter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>

                        {(filters.category ||
                            filters.status ||
                            filters.sortBy !== "newest") && (
                            <Button
                                variant="ghost"
                                onClick={resetFilters}
                                className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                            >
                                <FiX className="mr-1 h-4 w-4" />
                                Clear filters
                            </Button>
                        )}
                    </div>
                </div>

                {/* Expanded filters */}
                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Select
                                label="Category"
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                options={[
                                    { value: "", label: "All Categories" },
                                    ...categories.map((cat) => ({
                                        value: cat,
                                        label: cat,
                                    })),
                                ]}
                            />

                            <Select
                                label="Status"
                                name="status"
                                value={filters.status}
                                onChange={handleFilterChange}
                                options={[
                                    { value: "", label: "All Statuses" },
                                    { value: "published", label: "Published" },
                                    { value: "draft", label: "Draft" },
                                ]}
                            />

                            <Select
                                label="Sort By"
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={handleFilterChange}
                                options={[
                                    { value: "newest", label: "Newest First" },
                                    { value: "oldest", label: "Oldest First" },
                                    {
                                        value: "title-asc",
                                        label: "Title (A-Z)",
                                    },
                                    {
                                        value: "title-desc",
                                        label: "Title (Z-A)",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Blog list */}
            {pageItems.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pageItems.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                {...blog}
                                onDelete={handleDeleteBlog}
                            />
                        ))}
                    </div>
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredBlogs.length}
                            perPage={perPage}
                            onPageChange={setCurrentPage}
                            onPerPageChange={(size) => {
                                setPerPage(size);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </>
            ) : (
                <div className="text-center py-12 bg-white dark:bg-[#1a1d2d] rounded-xl shadow border border-slate-200 dark:border-slate-800 transition-colors">
                    <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                        No blog posts found
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {searchTerm || filters.category || filters.status
                            ? "Try adjusting your search or filter to find what you're looking for."
                            : "Get started by creating a new blog post."}
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/blogs/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                        >
                            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                            New Blog Post
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogList;
