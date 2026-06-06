import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import type { Project, ProjectsState } from '@/types';
import type { ProjectFormValues } from '@/lib/validators';
import { mockProjects } from '@/lib/mockData';
import { mockDelay } from '@/lib/axios';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const createProject = createAsyncThunk(
  'projects/create',
  async (data: ProjectFormValues & { ownerId: string }) => {
    await mockDelay(400);
    const project: Project = {
      id: nanoid(),
      name: data.name,
      description: data.description,
      status: data.status,
      ownerId: data.ownerId,
      createdAt: new Date().toISOString(),
    };
    return project;
  },
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async (data: ProjectFormValues & { id: string }) => {
    await mockDelay(400);
    return data;
  },
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id: string) => {
    await mockDelay(300);
    return id;
  },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: ProjectsState = {
  items: mockProjects,
  isLoading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder
      .addCase(createProject.pending, (state) => { state.isLoading = true; })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to create project';
      });

    // update
    builder
      .addCase(updateProject.pending, (state) => { state.isLoading = true; })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = {
            ...state.items[idx],
            name: action.payload.name,
            description: action.payload.description,
            status: action.payload.status,
          };
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to update project';
      });

    // delete
    builder
      .addCase(deleteProject.pending, (state) => { state.isLoading = true; })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to delete project';
      });
  },
});

export default projectsSlice.reducer;
