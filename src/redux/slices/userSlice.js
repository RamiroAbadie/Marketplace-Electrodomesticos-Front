import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

/* ─────────  Thunks de autenticación  ───────── */

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

/* ─────────  Thunk NUEVO: lista de usuarios (panel admin)  ───────── */

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/users"); // backend: GET /api/users
      return data; // array de UserResponse
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error al obtener usuarios"
      );
    }
  }
);

/* ─────────  Estado inicial  ───────── */

const initialState = {
  /* auth */
  user: null,
  token: null,

  /* admin */
  users: [],           // ← aquí guardamos la lista para el DataGrid
  loading: false,
  error: null,
};

/* ─────────  Slice  ───────── */

const userSlice = createSlice({
  name: "users",       // el store lo registra como s.users
  initialState,
  reducers: {
    logout: (s) => {
      s.user = null;
      s.token = null;
    },
  },
  extraReducers: (b) => {
    /* -------- register -------- */
    b.addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.access_token;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || "Error registro";
      })

      /* -------- login -------- */
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.access_token;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || "Error login";
      })

      /* -------- fetchUsers (nuevo) -------- */
      .addCase(fetchUsers.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload;
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
