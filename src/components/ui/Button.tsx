
import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  block?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
}

function Button({
  children,
  isLoading = false,
  block = false,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        block && "w-full",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700": variant === "primary",
          "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
          "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-white": variant === "outline",
        },
        className
      )}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export default Button;
