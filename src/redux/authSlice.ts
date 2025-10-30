// src/redux/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signin, signup, getCurrentUser } from "../api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ Thunks
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await signup(formData);
      return res; // no token stored (cookie-based)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (formData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await signin(formData);
      return res; // cookie automatically set
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentUser();
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signinUser.rejected, (state, action) => {    
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
