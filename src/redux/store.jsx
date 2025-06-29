import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer,
        categories: categoryReducer,
    },
});