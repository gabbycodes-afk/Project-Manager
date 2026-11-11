export type TaskStatus = "Todo" | "In Progress" | "Completed";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  project: string;
}

export interface CreateTaskData {
  title: string;
  assignee: string;
  dueDate: string;
  priority: TaskPriority;
  project: string;
}