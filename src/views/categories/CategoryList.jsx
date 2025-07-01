import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAllCategories,
  deleteCategory,
} from "../../redux/slices/categorySlice";

import CategoryForm from "./CategoryForm";

export default function CategoryList() {
  const dispatch = useDispatch();

  /* ------------- Redux state ------------- */
  const { categories, loading } = useSelector((s) => s.categories);
  //  ^^^^^^^^^^^  ← Esta propiedad EXISTE en tu slice:
  //                initialState = { categories: [], ... }

  /* ------------- Local state ------------- */
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  /* ------------- Cargar al montar ------------- */
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  /* ------------- Columnas DataGrid ------------- */
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "description", headerName: "Descripción", flex: 1 },
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
            setOpen(true);
          }}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Eliminar"
          onClick={() => dispatch(deleteCategory(params.id))}
        />,
      ],
    },
  ];

  /* ------------- Render ------------- */
  return (
    <Box>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => {
          setSelected(null);  // modo “crear”
          setOpen(true);
        }}
      >
        Nueva categoría
      </Button>

      <DataGrid
        autoHeight
        rows={categories}          // ← la lista correcta
        columns={columns}
        loading={loading}
        pageSize={10}
        disableRowSelectionOnClick
      />

      {open && (
        <CategoryForm
          open={open}
          onClose={() => setOpen(false)}
          initialData={selected}
        />
      )}
    </Box>
  );
}
