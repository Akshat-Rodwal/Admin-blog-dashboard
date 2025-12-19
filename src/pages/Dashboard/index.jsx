
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useApp } from "../../hooks/useApp";
import { FiPlus } from "react-icons/fi";
import {
    MdArticle,
    MdCheckCircle,
    MdEditNote,
    MdTrendingUp,
    MdTrendingFlat,
    MdMoreVert,
} from "react-icons/md";

const Dashboard = () => {
    const { counts, blogs } = useApp();

    const recent = useMemo(() => {
        return blogs
            .filter((b) => !b.deleted)
            .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
            .slice(0, 5);
    }, [blogs]);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark  transition-colors">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Dashboard Overview
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Welcome back, admin. Here's what's happening with
                            your blog today.
                        </p>
                    </div>
                    <Link
                        to="/blogs/new"
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                        <FiPlus className="h-5 w-5" />
                        Create New Post
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Blogs */}
                    <div className="bg-white dark:bg-[#1a1d2d] rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MdArticle className="text-6xl text-primary" />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-primary">
                                    <MdArticle className="text-xl" />
                                </div>
                                <h3 className="text-sm text-slate-500 dark:text-slate-400">
                                    Total Blogs
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {counts.total}
                                </span>
                                <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                    <MdTrendingUp className="mr-0.5" />
                                    12%
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                vs previous month
                            </p>
                        </div>
                    </div>

                    {/* Published */}
                    <div className="bg-white dark:bg-[#1a1d2d] rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MdCheckCircle className="text-6xl text-green-600" />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-green-50 dark:bg-green-900/30 text-green-600">
                                    <MdCheckCircle className="text-xl" />
                                </div>
                                <h3 className="text-sm text-slate-500 dark:text-slate-400">
                                    Published Posts
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {counts.published}
                                </span>
                                <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">
                                    <MdTrendingUp className="mr-0.5" />
                                    5%
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                Consistent growth
                            </p>
                        </div>
                    </div>

                    {/* Drafts */}
                    <div className="bg-white dark:bg-[#1a1d2d] rounded-xl p-6 border border-slate-100 dark:border-slate-800 shadow hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <MdEditNote className="text-6xl text-orange-500" />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-orange-50 dark:bg-orange-900/30 text-orange-500">
                                    <MdEditNote className="text-xl" />
                                </div>
                                <h3 className="text-sm text-slate-500 dark:text-slate-400">
                                    Drafts
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-2 mt-4">
                                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                    {counts.draft}
                                </span>
                                <span className="flex items-center text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                    <MdTrendingFlat className="mr-0.5" />
                                    0%
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">
                                Pending review
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white dark:bg-[#1a1d2d] rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#1f2235]">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Recent Posts
                        </h3>
                        <Link
                            to="/blogs"
                            className="text-sm font-medium text-primary hover:text-blue-700 flex items-center gap-1"
                        >
                            View all
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-xs uppercase text-slate-500 bg-slate-50 dark:bg-[#1f2235]">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {recent.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        post.image ||
                                                        "https://via.placeholder.com/80x80?text=No+Image"
                                                    }
                                                    alt={post.title}
                                                    className="size-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                                                />
                                                <span className="font-medium text-slate-900 dark:text-slate-100 line-clamp-1">
                                                    {post.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {post.author}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    post.status === "published"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                                                }`}
                                            >
                                                {post.status === "published"
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm text-slate-500">
                                            {new Date(
                                                post.publishDate
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/blogs/${post.id}`}
                                                className="p-1 rounded-full text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors inline-flex items-center justify-center"
                                                aria-label="View post"
                                            >
                                                <MdMoreVert />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {recent.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-6 text-center text-slate-500"
                                        >
                                            No recent posts
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
