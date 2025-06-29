import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance"; // IMPORTANTE

// Acción asincrónica para registrar usuario
export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/auth/register", userData);
            const data = res.data;

            // persistencia en LocalStorage
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return data; // { access_token, user }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Error en registro"
            );
        }
    }
);

// Estado inicial
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
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
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
                state.error = action.payload || "Error desconocido";
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
