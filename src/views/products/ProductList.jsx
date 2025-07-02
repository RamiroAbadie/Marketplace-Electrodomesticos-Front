import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import {
  getAllProducts,
  deleteProduct,
  addImagesToProduct,
} from "../../redux/slices/productSlice";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);

  /* modal de editar/crear */
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null);

  /* snackbar éxito */
  const [openSnack, setOpenSnack] = useState(false);

  /* refs para cargar imágenes */
  const fileRef = useRef(null);
  const productIdRef = useRef(null);

  /* cargar productos al montar */
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  /* ───── manejadores ───── */
  const handleEdit = (row) => {
    setSelected(row);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar producto?")) dispatch(deleteProduct(id));
  };

  const triggerFile = (id) => {
    productIdRef.current = id;
    fileRef.current.click();
  };

  const handleUpload = (e) => {
    const files = e.target.files;
    if (files && files.length) {
      dispatch(addImagesToProduct({ id: productIdRef.current, files }))
        .unwrap()
        .then(() => setOpenSnack(true))          // ← snackbar éxito
        .catch(() => alert("Error al subir imágenes"));
    }
    e.target.value = null; // reset input
  };

  /* filas con cantidad de imágenes */
  const rows = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        imageCount: Array.isArray(p.images) ? p.images.length : 0,
      })),
    [products]
  );

  /* columnas */
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "price", headerName: "Precio", width: 120 },
    { field: "stock", headerName: "Stock", width: 100 },
    { field: "categoryDescription", headerName: "Categoría", flex: 1 },
    {
      field: "imageCount",
      headerName: "Imgs",
      width: 90,
    },
    {
      field: "actions",
      type: "actions",
      width: 130,
      getActions: (params) => [
        <GridActionsCellItem
          key="photos"
          icon={<AddPhotoAlternateIcon />}
          label="Agregar imágenes"
          onClick={() => triggerFile(params.id)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Editar"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box>
      {/* botón nuevo producto */}
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setSelected(null);
          setOpenForm(true);
        }}
      >
        NUEVO PRODUCTO
      </Button>

      {/* tabla de productos */}
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={10}
        disableRowSelectionOnClick
      />

      {/* input oculto para subir imágenes */}
      <input
        type="file"
        ref={fileRef}
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />

      {/* modal producto */}
      {openForm && (
        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          initialData={selected}
        />
      )}

      {/* snackbar éxito */}
      <Snackbar
        open={openSnack}
        autoHideDuration={3000}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnack(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Imágenes cargadas correctamente ✅
        </Alert>
      </Snackbar>
    </Box>
  );
}
