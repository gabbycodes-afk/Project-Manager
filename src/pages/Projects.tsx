
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  fetchTasks,
  deleteTask,
  updateTaskStatus,
} from "../store/tasksSlice";
import type { TaskStatus } from "../types";
import { Plus, Trash2, X, RefreshCw } from "lucide-react";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import CreateTaskForm from "../components/CreateTaskForm";

function Projects() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [showForm, setShowForm] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    setUpdatingId(id);
    setActionError("");

    try {
      await dispatch(updateTaskStatus({ id, status })).unwrap();
    } catch {
      setActionError("Unable to update task status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setDeletingId(id);
    setActionError("");

    try {
      await dispatch(deleteTask(id)).unwrap();
    } catch {
      setActionError("Unable to delete task.");
    } finally {
      setDeletingId(null);
    }
  };

  const projectNames = [...new Set(tasks.map((task) => task.project))];

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projects & Tasks
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Organize projects and manage your team's tasks.
          </p>
        </div>

        <Button onClick={() => setShowForm(true)}>
          <Plus size={18} />
          Create Task
        </Button>
      </div>

      {actionError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950">
          {actionError}
        </p>
      )}

      {loading ? (
        <div className="py-16 text-center text-gray-500">
          <RefreshCw className="mx-auto mb-3 animate-spin" />
          Loading projects and tasks...
        </div>
      ) : error ? (
        <div className="rounded-xl bg-red-50 p-6 text-center text-red-600 dark:bg-red-950">
          <p>{error}</p>
          <Button className="mt-4" onClick={() => dispatch(fetchTasks())}>
            Try Again
          </Button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <Plus className="mx-auto mb-3 text-gray-400" size={32} />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            No tasks yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Create your first task to get started.
          </p>
          <Button className="mx-auto mt-5" onClick={() => setShowForm(true)}>
            Create Your First Task
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {projectNames.map((project) => {
            const projectTasks = tasks.filter(
              (task) => task.project === project
            );

            return (
              <section
                key={project}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {projectTasks.length} tasks
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {projectTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {task.title}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                          Assigned to {task.assignee} · Due {task.dueDate}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <StatusBadge status={task.status} />
                          <StatusBadge priority={task.priority} />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          value={task.status}
                          disabled={updatingId === task.id}
                          onChange={(e) =>
                            handleStatusChange(
                              task.id,
                              e.target.value as TaskStatus
                            )
                          }
                          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <button
                          onClick={() => handleDelete(task.id)}
                          disabled={deletingId === task.id}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950"
                          title="Delete task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Create New Task
              </h3>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <CreateTaskForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
