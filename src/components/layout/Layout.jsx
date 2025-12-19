import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col transition-colors">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
                <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
                    <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        <Outlet />
                        <footer className="mt-8 bg-white dark:bg-[#1e2130] border-t border-slate-200 dark:border-slate-800 py-4 px-6 rounded-t-lg shadow-sm transition-colors">
                            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                <p>
                                    © {new Date().getFullYear()} Blog Admin
                                    Dashboard
                                </p>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://example.com/terms"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                    >
                                        Terms
                                    </a>
                                    <a
                                        href="https://example.com/privacy"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                    >
                                        Privacy
                                    </a>
                                    <a
                                        href="https://example.com/help"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                    >
                                        Help
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
