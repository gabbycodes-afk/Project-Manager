import type { TaskStatus, TaskPriority } from "../../types";

interface StatusBadgeProps {
  status?: TaskStatus;
  priority?: TaskPriority;
}

function StatusBadge({ status, priority }: StatusBadgeProps) {
  const value = status || priority || "Todo";

  const styles: Record<string, string> = {
    Todo: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Low: "bg-gray-100 text-gray-600",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[value]}`}
    >
      {value}
    </span>
  );
}

export default StatusBadge;