import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import productsReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import orderReducer from "./slices/orderSlice.js";



export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        cart: cartReducer,
        categories: categoryReducer,
        orders: orderReducer,
    },
});