import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { fetchUsers } from "../../redux/slices/userSlice";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users = [], loading = false } = useSelector((s) => s.user); 

  /* cargar al montar */
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  /* columnas */
  const columns = [
    { field: "id",        headerName: "ID", width: 70 },
    { field: "firstname", headerName: "Nombre",  flex: 2, minWidth: 220 },
    { field: "lastname",  headerName: "Apellido", flex: 2, minWidth: 220 },
    { field: "email",     headerName: "Email", flex: 2, minWidth: 220 },
    { field: "role",      headerName: "Rol", width: 120 },
    {
      field: "actions",
      type: "actions",
      width: 90,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<VisibilityIcon />}
          label="Ver órdenes"
          onClick={() => navigate(`/admin/users/${params.id}/orders`)}
        />,
      ],
    },
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
