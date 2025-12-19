import { FiMenu, FiBell, FiSearch, FiUser, FiFileText } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

const Navbar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { setSearchTerm } = useApp();
    const [query, setQuery] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [showUser, setShowUser] = useState(false);

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#1e2130] border-b border-slate-200 dark:border-slate-800 sticky top-0 left-0 right-0 w-full z-50 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden text-slate-500 hover:text-primary dark:text-slate-400 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
                        <FiFileText className="h-5 w-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
                        BlogAdmin
                    </h1>
                </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 border-none rounded-full leading-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white dark:focus:bg-slate-900 transition-all duration-200 sm:text-sm"
                        placeholder="Search posts, authors, or tags..."
                        type="text"
                        value={query}
                        onChange={(e) => {
                            const v = e.target.value;
                            setQuery(v);
                            setSearchTerm(v);
                            navigate("/blogs");
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowNotif((s) => !s);
                            setShowUser(false);
                        }}
                        className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                    >
                        <FiBell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a1d2d]"></span>
                    </button>
                    {showNotif && (
                        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#1e2130] border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg p-2">
                            <div className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Notifications
                            </div>
                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                <li className="py-2 px-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                                    New draft created
                                </li>
                                <li className="py-2 px-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded">
                                    Post published
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="relative flex items-center gap-3">
                    <div className="size-9 rounded-full bg-slate-200 bg-cover bg-center border-2 border-transparent group-hover:border-primary transition-all duration-200 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-slate-700" />
                    </div>
                    <button
                        onClick={() => {
                            setShowUser((s) => !s);
                            setShowNotif(false);
                        }}
                        className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Menu
                    </button>
                    {showUser && (
                        <div className="absolute right-0 top-10 w-44 bg-white dark:bg-[#1e2130] border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg">
                            <a
                                href="/dashboard"
                                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                Dashboard
                            </a>
                            <a
                                href="/blogs"
                                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                All Blogs
                            </a>
                            <a
                                href="/blogs/new"
                                className="block px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                New Blog
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
