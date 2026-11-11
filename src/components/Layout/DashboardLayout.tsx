
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Command,
  Sun,
  Moon,
  CheckCheck,
} from "lucide-react";
import Sidebar from "../ui/Sidebar";
import { useTheme } from "../../context/ThemeContext";

const pageDetails: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Here's what's happening with your workspace today.",
  },
  "/projects": {
    title: "Projects",
    subtitle: "Manage your projects, tasks and team progress.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your account and workspace preferences.",
  },
};

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Welcome to ProjectHub",
      description: "Your workspace is ready. Start organising your projects.",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      title: "Task management",
      description: "You can create, update and track your tasks.",
      time: "Today",
      read: false,
    },
  ]);

  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const unreadCount = notifications.filter((item) => !item.read).length;

  const currentPage = pageDetails[location.pathname] ?? {
    title: "Workspace",
    subtitle: "Manage your work in one place.",
  };

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-[#0b1120] dark:text-slate-100">
      <Sidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
        expanded={sidebarExpanded}
        toggleExpanded={() =>
          setSidebarExpanded((current) => !current)
        }
      />

      <div className="min-h-screen min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-xl dark:border-slate-800 dark:bg-[#111827]/90 sm:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                {currentPage.title}
              </h2>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
                {currentPage.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800/70 md:flex">
              <Search size={15} />
              <span>Quick search</span>
              <span className="ml-5 flex items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] dark:border-slate-600 dark:bg-slate-700">
                <Command size={10} /> K
              </span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[10px] font-bold text-white dark:border-[#111827]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-14 z-50 w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#172033]">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 dark:border-slate-700">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        Notifications
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {unreadCount} unread notifications
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={markAllRead}
                      className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                    >
                      <CheckCheck size={14} />
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-6 text-center text-sm text-slate-500">
                        You're all caught up.
                      </p>
                    ) : (
                      notifications.map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() =>
                            setNotifications((items) =>
                              items.map((notification) =>
                                notification.id === item.id
                                  ? { ...notification, read: true }
                                  : notification
                              )
                            )
                          }
                          className="flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/70"
                        >
                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                              item.read ? "bg-slate-300" : "bg-indigo-500"
                            }`}
                          />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                                {item.title}
                              </span>
                              <span className="shrink-0 text-[10px] text-slate-400">
                                {item.time}
                              </span>
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                              {item.description}
                            </span>
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-700 sm:pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 dark:text-white">
                  Admin User
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>
              <ChevronDown
                size={15}
                className="hidden text-slate-400 sm:block"
              />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
