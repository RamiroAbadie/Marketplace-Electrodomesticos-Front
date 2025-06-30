import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

// GET todas las categorías
export const getAllCategories = createAsyncThunk(
    "categories/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/categories");
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener categorías"
            );
        }
    }
);

// GET categoría por ID
export const getCategoryById = createAsyncThunk(
    "categories/getById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/categories/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al obtener categoría"
            );
        }
    }
);

// POST crear categoría
export const createCategory = createAsyncThunk(
    "categories/create",
    async (description, thunkAPI) => {
        try {
            const res = await axiosInstance.post("/categories", { description });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al crear categoría"
            );
        }
    }
);

// PUT actualizar categoría
export const updateCategory = createAsyncThunk(
    "categories/update",
    async ({ id, description }, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/categories/${id}`, { description });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al actualizar categoría"
            );
        }
    }
);

// DELETE eliminar categoría
export const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (id, thunkAPI) => {
        try {
            await axiosInstance.delete(`/categories/${id}`);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || "Error al eliminar categoría"
            );
        }
    }
);


// Slice
const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearCategoryState: (state) => {
            state.selectedCategory = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET ALL
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET BY ID
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.selectedCategory = null;
                state.error = null;
            })
            .addCase(getCategoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCategory = action.payload;
            })
            .addCase(getCategoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // CREATE
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const i = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (i !== -1) state.categories[i] = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories = state.categories.filter(cat => cat.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCategoryState } = categorySlice.actions;
export default categorySlice.reducer;
