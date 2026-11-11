
import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { createTask } from "../store/tasksSlice";
import type { TaskPriority } from "../types";
import Input from "./ui/Input";
import Button from "./ui/Button";

interface CreateTaskFormProps {
  onClose: () => void;
}

function CreateTaskForm({ onClose }: CreateTaskFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [project, setProject] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !assignee.trim() || !dueDate || !project.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (dueDate < new Date().toISOString().split("T")[0]) {
      setError("Due date cannot be in the past.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await dispatch(
        createTask({
          title: title.trim(),
          assignee: assignee.trim(),
          dueDate,
          priority,
          project: project.trim(),
        })
      ).unwrap();

      onClose();
    } catch {
      setError("Unable to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        id="task-title"
        label="Task Title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        id="assignee"
        label="Assignee"
        placeholder="Enter assignee name"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />

      <Input
        id="due-date"
        label="Due Date"
        type="date"
        value={dueDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <div className="space-y-1.5">
        <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Priority
        </label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <Input
        id="project"
        label="Project"
        placeholder="Enter project name"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={loading}>
          Create Task
        </Button>
      </div>
    </form>
  );
}

export default CreateTaskForm;
