import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, RegisterCredentials } from '@/types';
import { mockUsers } from '@/lib/mockData';
import { mockDelay } from '@/lib/axios';

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    await mockDelay(600);
    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user || credentials.password !== 'password') {
      return rejectWithValue('Invalid email or password.');
    }
    const token = `mock-jwt-${user.id}-${Date.now()}`;
    if (typeof window !== 'undefined') localStorage.setItem('ph_token', token);
    return { user, token };
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    await mockDelay(800);
    const exists = mockUsers.some((u) => u.email === credentials.email);
    if (exists) return rejectWithValue('An account with this email already exists.');
    // Mock success — in real app you'd get back a user + token
    return { message: 'Account created successfully. Please sign in.' };
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  if (typeof window !== 'undefined') localStorage.removeItem('ph_token');
});

// ─── Initial state ────────────────────────────────────────────────────────────

function loadUserFromStorage(): { user: AuthState['user']; token: string | null } {
  if (typeof window === 'undefined') return { user: null, token: null };
  const token = localStorage.getItem('ph_token');
  if (!token) return { user: null, token: null };
  // Decode mock token to get userId
  const userId = token.split('-')[2];
  const user = mockUsers.find((u) => u.id === userId) ?? null;
  return { user, token };
}

const { user: storedUser, token: storedToken } = loadUserFromStorage();

const initialState: AuthState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // register
    builder
      .addCase(register.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(register.fulfilled, (state) => { state.isLoading = false; })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
