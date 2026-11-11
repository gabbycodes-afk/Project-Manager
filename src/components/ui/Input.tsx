import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="w-full space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        id={id}
        {...props}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white ${className || ""}`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Input;