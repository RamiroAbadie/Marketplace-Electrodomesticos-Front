import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ──────────────── THUNKS ──────────────── */

// Crear orden
export const createOrder = createAsyncThunk(
    "orders/create",
    async (orderData, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.post("/orders", orderData);
            return data;
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
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(`/orders/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener la orden"
            );
        }
    }
);

// Obtener órdenes por usuario
export const getOrdersByUser = createAsyncThunk(
    "orders/getByUser",
    async (userId, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(`/orders/user/${userId}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener órdenes del usuario"
            );
        }
    }
);

/* ──────────────── SLICE ──────────────── */

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
            // CREATE
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

            // GET BY ID
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

            // GET BY USER
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
