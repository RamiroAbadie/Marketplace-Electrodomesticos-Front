import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

/* ───────── Thunks de autenticación ───────── */

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("v1/auth/register", userData);
      return data; // { access_token, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error en registro"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "v1/auth/authenticate",
        credentials
      );
      return data; // { access_token, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error en login"
      );
    }
  }
);

/* ───────── Thunk para lista de usuarios (admin) ───────── */

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/users");
      return data; // array de UserResponse
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error al obtener usuarios"
      );
    }
  }
);

/* ───────── Estado inicial ───────── */

const initialState = {
  user: null,
  token: null,
  users: [],
  loading: false,
  error: null,
};

/* ───────── Slice ───────── */

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    /* ----- register ----- */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error registro";
      })

      /* ----- login ----- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error login";
      })

      /* ----- fetchUsers (admin) ----- */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
