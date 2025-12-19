import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiFileText,
    FiPlusCircle,
    FiLogOut,
    FiX,
} from "react-icons/fi";

const Sidebar = ({ open = false, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        {
            path: "/dashboard",
            icon: <FiHome className="w-5 h-5" />,
            label: "Dashboard",
        },
        {
            path: "/blogs",
            icon: <FiFileText className="w-5 h-5" />,
            label: "All Blogs",
        },
        {
            path: "/blogs/new",
            icon: <FiPlusCircle className="w-5 h-5" />,
            label: "New Blog",
        },
    ];

    return (
        <>
            <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-[#1e2130] border-r border-slate-200 dark:border-slate-800 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300">
                <div className="flex flex-col flex-1 py-6 px-3 gap-1">
                    <div className="px-3 mb-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Main Menu
                        </span>
                    </div>
                    {navItems.map((item) => {
                        const active = location.pathname === item.path;
                        const base =
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all";
                        const activeCls =
                            "bg-primary/10 text-primary dark:bg-primary/20 font-medium";
                        const idleCls =
                            "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800";
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${base} ${
                                    active ? activeCls : idleCls
                                }`}
                            >
                                <span className="">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => {
                            navigate("/dashboard");
                            onClose && onClose();
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all"
                    >
                        <FiLogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
            <div
                className={`lg:hidden fixed inset-0 z-40 ${
                    open ? "block" : "hidden"
                }`}
            >
                <div
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40"
                ></div>
                <aside
                    className={`absolute top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-[#1e2130] border-r border-slate-200 dark:border-slate-800 shadow-xl translate-x-0 transition-transform`}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Main Menu
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 py-3 px-3 gap-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const active = location.pathname === item.path;
                            const base =
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all";
                            const activeCls =
                                "bg-primary/10 text-primary dark:bg-primary/20 font-medium";
                            const idleCls =
                                "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800";
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${base} ${
                                        active ? activeCls : idleCls
                                    }`}
                                    onClick={onClose}
                                >
                                    <span className="">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all">
                            <FiLogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
