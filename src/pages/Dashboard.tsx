
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchTasks } from "../store/tasksSlice";
import StatusBadge from "../components/ui/StatusBadge";
import { FolderKanban, CheckCircle2, Clock, ListTodo } from "lucide-react";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const pending = tasks.filter((task) => task.status === "Todo").length;

  const stats = [
    { label: "Total Tasks", value: tasks.length, icon: ListTodo },
    { label: "Completed", value: completed, icon: CheckCircle2 },
    { label: "In Progress", value: inProgress, icon: Clock },
    { label: "Pending", value: pending, icon: FolderKanban },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your team's tasks and progress.
        </p>
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-500">Loading dashboard...</p>
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <Icon className="text-indigo-600" size={22} />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
              Recent Tasks
            </h3>

            {tasks.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                No tasks yet. Create your first task in Projects.
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-4 last:border-0 dark:border-gray-700 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {task.assignee} · Due {task.dueDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <StatusBadge status={task.status} />
                      <StatusBadge priority={task.priority} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
