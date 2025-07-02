import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import {
  getAllProducts,
  deleteProduct,
  addImagesToProduct,
} from "../../redux/slices/productSlice";
import ProductForm from "./ProductForm";

/* helpers */
const toNum = (v) => (isFinite(v) ? Number(v) : 0);
const fmt   = (v, o) =>
  v == null ? "" : v.toLocaleString("es-AR", o);

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.products);

  const [openForm, setOpenForm]   = useState(false);
  const [selected, setSelected]   = useState(null);
  const [openSnack, setOpenSnack] = useState(false);

  const fileRef      = useRef(null);
  const productIdRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  /* filas */
  const rows = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        imageCount: Array.isArray(p.images) ? p.images.length : 0,
        finalPrice: toNum(p.price) * (1 - toNum(p.discount) / 100),
      })),
    [products]
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "description", headerName: "Descripción", flex: 1 },

    /* Precio original */
    {
      field: "price",
      headerName: "Precio ($)",
      width: 110,
      valueGetter: ({ row }) => row ? toNum(row.price) : null,
      valueFormatter: (p) => fmt(p?.value, { minimumFractionDigits: 2 }),
    },

    /* Descuento % */
    {
      field: "discount",
      headerName: "Desc. %",
      width: 90,
      valueGetter: ({ row }) => row ? toNum(row.discount) : null,
      valueFormatter: (p) =>
        p?.value == null
          ? ""
          : `${fmt(p.value, { maximumFractionDigits: 2 })}%`,
    },

    /* Precio con descuento */
    {
      field: "finalPrice",
      headerName: "Precio c/ desc.",
      width: 130,
      valueGetter: ({ row }) => row ? toNum(row.finalPrice) : null,
      valueFormatter: (p) => fmt(p?.value, { minimumFractionDigits: 2 }),
    },

    { field: "stock", headerName: "Stock", width: 90 },
    { field: "categoryDescription", headerName: "Categoría", flex: 1 },
    { field: "imageCount", headerName: "Imgs", width: 80 },

    /* acciones */
    {
      field: "actions",
      type: "actions",
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem
          key="photos"
          icon={<AddPhotoAlternateIcon />}
          label="Agregar imágenes"
          onClick={() => {
            productIdRef.current = params.id;
            fileRef.current.click();
          }}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Editar"
          onClick={() => {
            setSelected(params.row);
            setOpenForm(true);
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => {
            if (confirm("¿Eliminar producto?"))
              dispatch(deleteProduct(params.id));
          }}
        />,
      ],
    },
  ];

  /* subir imágenes */
  const handleUpload = (e) => {
    const files = e.target.files;
    if (files?.length) {
      dispatch(addImagesToProduct({ id: productIdRef.current, files }))
        .unwrap()
        .then(() => setOpenSnack(true))
        .catch(() => alert("Error al subir imágenes"));
    }
    e.target.value = null;
  };

  return (
    <Box>
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

      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={10}
        disableRowSelectionOnClick
      />

      <input
        type="file"
        ref={fileRef}
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />

      {openForm && (
        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          initialData={selected}
        />
      )}

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
