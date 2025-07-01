import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers } from "../../redux/slices/userSlice";

export default function UserList() {
  const dispatch = useDispatch();

  /* ───────── state.user es la clave real de tu store ───────── */
  const { users = [], loading = false } = useSelector((s) => s.user); // ← aquí

  /* cargar al montar */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* columnas */
  const columns = [
    { field: "id",        headerName: "ID",      width: 70 },
    { field: "firstname", headerName: "Nombre",  flex: 1 },
    { field: "lastname",  headerName: "Apellido",flex: 1 },
    { field: "email",     headerName: "Email",   flex: 1.5 },
    { field: "role",      headerName: "Rol",     width: 120 },
  ];

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={users}
        columns={columns}
        loading={loading}
        pageSize={10}
        disableRowSelectionOnClick
        getRowId={(row) => row.id ?? row.userId ?? row._id}
      />
    </Box>
  );
}
