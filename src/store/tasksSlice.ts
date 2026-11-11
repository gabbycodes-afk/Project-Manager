
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task, CreateTaskData, TaskStatus } from "../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
});

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: CreateTaskData) => {
    const task: Task = {
      ...data,
      id: crypto.randomUUID(),
      status: "Todo",
    };

    return task;
  }
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({ id, status }: { id: string; status: TaskStatus }) => ({
    id,
    status,
  })
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => id
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks.";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find((item) => item.id === action.payload.id);
        if (task) task.status = action.payload.status;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      });
  },
});

export default tasksSlice.reducer;
