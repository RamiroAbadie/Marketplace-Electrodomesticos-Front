import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";


// Registro
export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, thunkAPI) => {
        try {
            const res = await axiosInstance.post("v1/auth/register", userData);
            const data = res.data;
            return data; // { access_token, user }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error en registro"
            );
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, thunkAPI) => {
        try {
            const res = await axiosInstance.post("v1/auth/authenticate", credentials);
            const data = res.data;
            return data; // { access_token, user }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error en login"
            );
        }
    }
);

// Estado inicial
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

// Slice

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
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
