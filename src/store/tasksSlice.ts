import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import type { Task, TasksState, TaskStatus } from '@/types';
import type { TaskFormValues } from '@/lib/validators';
import { mockTasks } from '@/lib/mockData';
import { mockDelay } from '@/lib/axios';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const createTask = createAsyncThunk(
  'tasks/create',
  async (data: TaskFormValues) => {
    await mockDelay(400);
    const now = new Date().toISOString();
    const task: Task = {
      id: nanoid(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      dueDate: data.dueDate,
      assignedUserId: data.assignedUserId,
      projectId: data.projectId,
      createdAt: now,
      updatedAt: now,
    };
    return task;
  },
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (data: TaskFormValues & { id: string }) => {
    await mockDelay(400);
    return data;
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id: string) => {
    await mockDelay(300);
    return id;
  },
);

export const changeTaskStatus = createAsyncThunk(
  'tasks/changeStatus',
  async ({ id, status }: { id: string; status: TaskStatus }) => {
    await mockDelay(200);
    return { id, status };
  },
);

export const assignTask = createAsyncThunk(
  'tasks/assign',
  async ({ id, userId }: { id: string; userId: string | null }) => {
    await mockDelay(200);
    return { id, userId };
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: TasksState = {
  items: mockTasks,
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Synchronous status change for DnD (no delay needed)
    moveTask: (state, action: { payload: { id: string; status: TaskStatus } }) => {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    // create
    builder
      .addCase(createTask.pending, (state) => { state.isLoading = true; })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to create task';
      });

    // update
    builder
      .addCase(updateTask.pending, (state) => { state.isLoading = true; })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = {
            ...state.items[idx],
            title: action.payload.title,
            description: action.payload.description,
            priority: action.payload.priority,
            status: action.payload.status,
            dueDate: action.payload.dueDate,
            assignedUserId: action.payload.assignedUserId,
            projectId: action.payload.projectId,
            updatedAt: new Date().toISOString(),
          };
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to update task';
      });

    // delete
    builder
      .addCase(deleteTask.pending, (state) => { state.isLoading = true; })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to delete task';
      });

    // changeStatus
    builder.addCase(changeTaskStatus.fulfilled, (state, action) => {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    });

    // assignTask
    builder.addCase(assignTask.fulfilled, (state, action) => {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.assignedUserId = action.payload.userId;
        task.updatedAt = new Date().toISOString();
      }
    });
  },
});

export const { moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
