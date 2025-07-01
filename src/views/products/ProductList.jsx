import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAllProducts,
  deleteProduct,
} from "../../redux/slices/productSlice";

import ProductForm from "./ProductForm";

export default function ProductList() {
  const dispatch = useDispatch();

  /* Estado global */
  const { products } = useSelector((s) => s.products);

  /* Dialog state */
  const [openForm, setOpenForm] = useState(false);
  const [selected, setSelected] = useState(null); // producto a editar

  /* Cargar una sola vez */
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  /* Columnas del DataGrid */
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "price", headerName: "Precio", width: 120 },
    { field: "stock", headerName: "Stock", width: 100 },
    {
      field: "categoryDescription",          // ← viene directo del backend
      headerName: "Categoría",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      width: 90,
      getActions: (params) => [
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
          onClick={() => dispatch(deleteProduct(params.id))}
        />,
      ],
    },
  ];

  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setSelected(null);   // modo “crear”
          setOpenForm(true);
        }}
      >
        Nuevo producto
      </Button>

      <DataGrid
        autoHeight
        rows={products}
        columns={columns}
        pageSize={10}
        disableRowSelectionOnClick
      />

      {openForm && (
        <ProductForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          initialData={selected}
        />
      )}
    </Box>
  );
}
