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

// ✅ Signup Thunk
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    formData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await signup(formData);
      return res.data; // assume backend returns { message, user? }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// ✅ Signin Thunk (fetch user after login)
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (
    formData: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      // 1️⃣ Login → sets cookie
      await signin(formData);

      // 2️⃣ Fetch current user (cookie-based auth)
      const user = await dispatch(fetchCurrentUser()).unwrap();
// console.log("Fetched User after Signin:", user);
      // 3️⃣ Return user → stored in state
      return user;
   
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);

// ✅ Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentUser();
      // console.log("Current User Data:", res);
      return res; // ensure you return only the user object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// ✅ Logout Thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logout(); // backend clears cookie
      dispatch(logout()); // redux clears user
    } catch (err) {
      return rejectWithValue("Logout failed");
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
      // 🔹 Signin
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Signup
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

      // 🔹 Fetch Current User
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
      })

      // 🔹 Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
