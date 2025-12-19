import { Link } from "react-router-dom";
import {
    FiEdit2,
    FiTrash2,
    FiEye,
    FiCalendar,
    FiUser,
    FiTag,
} from "react-icons/fi";

const BlogCard = ({
    id,
    title,
    description,
    category,
    author,
    image,
    publishDate,
    status,
    onDelete,
    showActions = true,
}) => {
    const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="bg-white dark:bg-[#1e2130] rounded-xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {/* Blog Image */}
            <div className="h-48 overflow-hidden">
                <img
                    src={
                        image ||
                        "https://via.placeholder.com/800x400?text=No+Image"
                    }
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Blog Content */}
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                status === "published"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>

                        <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white line-clamp-1">
                            {title}
                        </h3>
                    </div>

                    {showActions && (
                        <div className="flex space-x-2">
                            <Link
                                to={`/blogs/${id}/edit`}
                                className="text-slate-500 hover:text-primary transition-colors"
                                title="Edit"
                            >
                                <FiEdit2 className="h-5 w-5" />
                            </Link>
                            <button
                                onClick={() => onDelete(id)}
                                className="text-slate-500 hover:text-red-600 transition-colors"
                                title="Delete"
                            >
                                <FiTrash2 className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                        <FiUser className="mr-1 h-3.5 w-3.5" />
                        {author}
                    </span>
                    <span className="flex items-center">
                        <FiCalendar className="mr-1 h-3.5 w-3.5" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center">
                        <FiTag className="mr-1 h-3.5 w-3.5" />
                        {category}
                    </span>
                </div>

                <div className="mt-4 flex justify-end">
                    <Link
                        to={`/blogs/${id}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:opacity-90"
                    >
                        Read more
                        <svg
                            className="ml-1 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
