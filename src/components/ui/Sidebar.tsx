
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  BriefcaseBusiness,
  Plus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  mobileOpen: boolean;
  closeMobile: () => void;
  expanded: boolean;
  toggleExpanded: () => void;
}

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({
  mobileOpen,
  closeMobile,
  expanded,
  toggleExpanded,
}: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMobile();
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col overflow-hidden border-r border-slate-800 bg-[#101827] text-slate-300 transition-[width,transform] duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:shrink-0 lg:translate-x-0 ${
          expanded ? "w-64" : "w-20"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30">
              <BriefcaseBusiness size={21} />
            </div>

            {expanded && (
              <div className="min-w-0 whitespace-nowrap">
                <h1 className="text-lg font-bold text-white">ProjectHub</h1>
                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-slate-500">
                  Workspace
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleExpanded}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            title={expanded ? "Collapse sidebar" : "Expand sidebar"}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white lg:flex"
          >
            {expanded ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
          </button>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-3 pt-8">
          {expanded && (
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-500">
              Workspace menu
            </p>
          )}

          <nav className="space-y-2">
            {navigation.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMobile}
                title={!expanded ? name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-950/40"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                {expanded && <span className="whitespace-nowrap">{name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {expanded && (
          <div className="mx-4 mt-auto mb-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
              <Plus size={19} />
            </div>
            <p className="text-sm font-semibold text-white">Keep work moving</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Organise tasks and keep your projects on track.
            </p>
          </div>
        )}

        <div className="mt-auto border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={!expanded ? "Logout" : undefined}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <LogOut size={20} className="shrink-0" />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
