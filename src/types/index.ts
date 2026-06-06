// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string; // initials fallback if absent
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// ─── Project ──────────────────────────────────────────────────────────────────

export type ProjectStatus = 'active' | 'on-hold' | 'completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string; // ISO date string
  ownerId: string;
  taskCount?: number;
  completedTaskCount?: number;
}

export interface ProjectsState {
  items: Project[];
  isLoading: boolean;
  error: string | null;
}

// ─── Task ─────────────────────────────────────────────────────────────────────

export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string; // ISO date string
  assignedUserId: string | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksState {
  items: Task[];
  isLoading: boolean;
  error: string | null;
}

// ─── UI / misc ────────────────────────────────────────────────────────────────

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export type Theme = 'light' | 'dark';
