import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useApp } from "../../hooks/useApp";
import Button from "../../components/common/Button";

const BlogDetail = () => {
    const { id } = useParams();
    const { blogs } = useApp();
    const blog = useMemo(() => blogs.find((b) => b.id === id), [blogs, id]);

    if (!blog) {
        return (
            <div className="bg-white dark:bg-[#1e2130] rounded-xl shadow p-6 border border-slate-200 dark:border-slate-800">
                <p className="text-slate-700 dark:text-slate-300">
                    Blog not found.
                </p>
                <Link to="/blogs">
                    <Button
                        variant="outline"
                        className="mt-4 flex items-center"
                    >
                        <FiArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog Posts
                    </Button>
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(blog.publishDate).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {blog.title}
                </h2>
                <Link to="/blogs">
                    <Button variant="outline" className="flex items-center">
                        <FiArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog Posts
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-[#1e2130] rounded-xl shadow overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                    src={
                        blog.image ||
                        "https://via.placeholder.com/800x400?text=No+Image"
                    }
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span
                            className={`px-2 py-0.5 rounded-full ${
                                blog.status === "published"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                            }`}
                        >
                            {blog.status}
                        </span>
                    </div>
                    <p className="mt-4 text-slate-700 dark:text-slate-300">
                        {blog.description}
                    </p>
                    <div className="mt-6 prose">
                        <p>{blog.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
