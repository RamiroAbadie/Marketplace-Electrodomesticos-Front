import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// Crear orden
export const createOrder = createAsyncThunk(
    "orders/create",
    async (orderData, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.user.token;

        try {
            const res = await axiosInstance.post("/orders", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al crear la orden"
            );
        }
    }
);


// Obtener orden por ID
export const getOrderById = createAsyncThunk(
    "orders/getById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/orders/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener la orden"
            );
        }
    }
);

// Obtener órdenes por usuario (solo admin)
export const getOrdersByUser = createAsyncThunk(
    "orders/getByUser",
    async (userId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/orders/user/${userId}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener órdenes del usuario"
            );
        }
    }
);

// Slice
const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        selectedOrder: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearOrderState: (state) => {
            state.orders = [];
            state.selectedOrder = null;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Crear orden
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.selectedOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Obtener por ID
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedOrder = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Obtener por usuario
            .addCase(getOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
