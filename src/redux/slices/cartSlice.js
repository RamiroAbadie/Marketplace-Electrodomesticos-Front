import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: [], // Cada item: { id, name, price, quantity }
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload });
            }
            cartSlice.caseReducers.updateTotal(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            cartSlice.caseReducers.updateTotal(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        updateTotal: (state) => {
            state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
