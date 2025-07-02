import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ──────────────── THUNKS ──────────────── */

// REGISTER
export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, thunkAPI) => {
      const axios = thunkAPI.extra;
      try {
        const { data } = await axios.post("v1/auth/register", userData);
        return data; // { access_token, user }
      } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Error en registro"
        );
      }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, thunkAPI) => {
      const axios = thunkAPI.extra;
      try {
        const { data } = await axios.post("v1/auth/authenticate", credentials);
        return data; // { access_token, user }
      } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Error en login"
        );
      }
    }
);

// FETCH USERS (ADMIN)
export const fetchUsers = createAsyncThunk(
    "users/fetch",
    async (_, thunkAPI) => {
      const axios = thunkAPI.extra;
      try {
        const { data } = await axios.get("/users");
        return data; // array de UserResponse
      } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response?.data?.message || "Error al obtener usuarios"
        );
      }
    }
);

/* ──────────────── SLICE ──────────────── */

const initialState = {
  user: null,
  token: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

        // REGISTER
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.access_token;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Error registro";
        })

        // LOGIN
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.access_token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Error login";
        })

        // FETCH USERS
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
