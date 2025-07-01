import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance.js";

// Obtener todos los productos
export const getAllProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/products");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener productos"
            );
        }
    }
);

//Crear producto
export const createProduct = createAsyncThunk('products/create', async (body) => {
  const { data } = await axiosInstance.post('/products', body);
  return data;
});

// Obtener producto por ID
export const getProductById = createAsyncThunk(
    "products/getById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/products/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener producto"
            );
        }
    }
);

// Obtener productos disponibles
export const getAvailableProducts = createAsyncThunk(
    "products/getAvailable",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/products/available");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener productos disponibles"
            );
        }
    }
);

// Obtener productos por categoría
export const getProductsByCategory = createAsyncThunk(
    "products/getByCategory",
    async (categoryId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/products/category/${categoryId}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al filtrar por categoría"
            );
        }
    }
);

// Buscar productos por texto
export const searchProducts = createAsyncThunk(
    "products/search",
    async (query, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/products/search?query=${encodeURIComponent(query)}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error en la búsqueda"
            );
        }
    }
);

// Obtener productos por rango de precio
export const getProductsByPriceRange = createAsyncThunk(
    "products/getByPriceRange",
    async ({ min = 0, max = 500000 }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/products/price-range?min=${min}&max=${max}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al filtrar por rango de precio"
            );
        }
    }
);

// Actualizar producto
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, ...body }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/products/${id}`, body);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error al actualizar producto"
      );
    }
  }
);

// Eliminar producto
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            return id; // Devolvemos el ID eliminado
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al eliminar producto"
            );
        }
    }
);

// Subir imágenes de un producto
export const addImagesToProduct = createAsyncThunk(
  "products/addImages",
  /**
   * @param {{ id: number, files: FileList }} payload
   */
  async ({ id, files }, thunkAPI) => {
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("images", f));

      const { data } = await axiosInstance.post(
        `/products/${id}/images`,          // endpoint backend
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data; // backend responde el producto actualizado (con images[])
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error al subir imágenes"
      );
    }
  }
);


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
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.fulfilled, (s, a) => { 
                s.list.push(a.payload); 
            })
            .addCase(getProductById.pending, (state) => {
                state.loading = true;
                state.selectedProduct = null;
                state.error = null;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAvailableProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAvailableProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getAvailableProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getProductsByPriceRange.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsByPriceRange.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getProductsByPriceRange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.fulfilled, (s, a) => {
                const i = s.products.findIndex(p => p.id === a.payload.id);
                if (i !== -1) s.products[i] = a.payload;
            })
            .addCase(addImagesToProduct.fulfilled, (s, a) => {
                const i = s.products.findIndex((p) => p.id === a.payload.id);
                if (i !== -1) s.products[i] = a.payload;       // refresca imágenes
            });
    },
});

export const { clearProductState } = productSlice.actions;

export default productSlice.reducer;
