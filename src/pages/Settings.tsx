
import { Moon, Sun, Palette, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and application preferences.
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <User className="text-indigo-600" size={22} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Account Information
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500">Name</p>
            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              Project Administrator
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email Address</p>
            <p className="mt-1 font-medium text-gray-900 dark:text-white">
              admin@projecthub.com
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <Palette className="text-indigo-600" size={22} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Appearance
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Theme preference
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Switch between light and dark mode.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Settings;
