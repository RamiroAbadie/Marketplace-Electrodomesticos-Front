import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ──────────────────── THUNKS ──────────────────── */

// GET todos los productos
export const getAllProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get("/products");
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener productos"
            );
        }
    }
);

// POST crear producto (body incluye discount)
export const createProduct = createAsyncThunk(
    "products/create",
    async (body, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.post("/products", body);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al crear producto"
            );
        }
    }
);

// GET por ID
export const getProductById = createAsyncThunk(
    "products/getById",
    async (id, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(`/products/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener producto"
            );
        }
    }
);

export const getAvailableProducts = createAsyncThunk(
    "products/getAvailable",
    async (_, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get("/products/available");
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener productos disponibles"
            );
        }
    }
);

export const getProductsByCategory = createAsyncThunk(
    "products/getByCategory",
    async (categoryId, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(`/products/category/${categoryId}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al filtrar por categoría"
            );
        }
    }
);

export const searchProducts = createAsyncThunk(
    "products/search",
    async (query, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(
                `/products/search?query=${encodeURIComponent(query)}`
            );
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error en la búsqueda"
            );
        }
    }
);

export const getProductsByPriceRange = createAsyncThunk(
    "products/getByPriceRange",
    async ({ min = 0, max = 500000 }, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.get(
                `/products/price-range?min=${min}&max=${max}`
            );
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al filtrar por rango de precio"
            );
        }
    }
);

// PUT actualizar producto
export const updateProduct = createAsyncThunk(
    "products/update",
    async ({ id, ...body }, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const { data } = await axios.put(`/products/${id}`, body);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al actualizar producto"
            );
        }
    }
);

// DELETE producto
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            await axios.delete(`/products/${id}`);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al eliminar producto"
            );
        }
    }
);

// POST imágenes
export const addImagesToProduct = createAsyncThunk(
    "products/addImages",
    async ({ id, files }, thunkAPI) => {
        const axios = thunkAPI.extra;
        try {
            const formData = new FormData();
            Array.from(files).forEach((f) => formData.append("images", f));
            const { data } = await axios.post(
                `/products/${id}/images`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al subir imágenes"
            );
        }
    }
);

/* ──────────────────── SLICE ──────────────────── */

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearProductState: (state) => {
            state.selectedProduct = null;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(getAllProducts.pending, (s) => {
                s.loading = true;
                s.error = null;
            })
            .addCase(getAllProducts.fulfilled, (s, a) => {
                s.loading = false;
                s.products = a.payload;
            })
            .addCase(getAllProducts.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })

            // CREATE
            .addCase(createProduct.pending, (s) => {
                s.success = false;
                s.loading = true;
            })
            .addCase(createProduct.fulfilled, (s, a) => {
                s.loading = false;
                s.success = true;
                s.products.push(a.payload);
            })
            .addCase(createProduct.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })

            // UPDATE
            .addCase(updateProduct.fulfilled, (s, a) => {
                const i = s.products.findIndex((p) => p.id === a.payload.id);
                if (i !== -1) s.products[i] = a.payload;
            })

            // DELETE
            .addCase(deleteProduct.fulfilled, (s, a) => {
                s.products = s.products.filter((p) => p.id !== a.payload);
            })

            // GET BY ID
            .addCase(getProductById.pending, (s) => {
                s.loading = true;
                s.selectedProduct = null;
                s.error = null;
            })
            .addCase(getProductById.fulfilled, (s, a) => {
                s.loading = false;
                s.selectedProduct = a.payload;
            })
            .addCase(getProductById.rejected, (s, a) => {
                s.loading = false;
                s.error = a.payload;
            })

            // AVAILABLE
            .addCase(getAvailableProducts.fulfilled, (s, a) => {
                s.products = a.payload;
            })

            // BY CATEGORY
            .addCase(getProductsByCategory.fulfilled, (s, a) => {
                s.products = a.payload;
            })

            // SEARCH
            .addCase(searchProducts.fulfilled, (s, a) => {
                s.products = a.payload;
            })

            // PRICE RANGE
            .addCase(getProductsByPriceRange.fulfilled, (s, a) => {
                s.products = a.payload;
            })

            // ADD IMAGES
            .addCase(addImagesToProduct.fulfilled, (s, a) => {
                const i = s.products.findIndex((p) => p.id === a.payload.id);
                if (i !== -1) s.products[i] = a.payload;
            });
    },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
