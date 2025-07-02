import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getOrdersByUser } from "../../redux/slices/orderSlice";

export default function UserOrdersList() {
  const { id } = useParams();          // userId de la URL
  const dispatch = useDispatch();

  const { orders = [], loading } = useSelector((s) => s.orders);
  const [selected, setSelected] = useState(null); // orden seleccionada

  /* ─── Cargar ordenes al montar ─── */
  useEffect(() => {
    dispatch(getOrdersByUser(id));
  }, [dispatch, id]);

  const rows = useMemo(
    () =>
      orders.map((o) => {
        const items = o.items ?? [];

        const totalRaw = items.reduce(
          (sum, it) => sum + Number(it.quantity) * Number(it.unitPrice),
          0
        );
        /* redondeado a 2 decimales */
        const total = Number(totalRaw.toFixed(2));

        /* listado de descripciones */
        const products = items.map((it) => it.description).join(", ");

        return {
          ...o,
          itemsCount: items.length,
          products,
          total,
        };
      }),
    [orders]
  );

  /* ─── Columnas de la tabla de órdenes ─── */
  const orderColumns = [
    { field: "orderId", headerName: "ID", width: 80 },
    { field: "userName", headerName: "Usuario", width: 140 },
    { field: "itemsCount", headerName: "Items", width: 90 },
    { field: "products", headerName: "Productos", flex: 1 },
    {
      field: "total",
      headerName: "Total ($)",
      width: 120,

      /* Pintamos la celda directamente */
      renderCell: (p) => {
        const val = p.row?.total; // numero (o undefined 1er pasada)
        if (val === undefined) return "";

        return val.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  ];

  /* ─── Columnas de la tabla de items ─── */
  const itemColumns = [
    { field: "productId", headerName: "Producto ID", width: 120 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "category", headerName: "Categoría", width: 160 },
    { field: "quantity", headerName: "Cant.", width: 90 },
    {
      field: "unitPrice",
      headerName: "Precio unit.",
      width: 120,
      renderCell: (p) => {
        const raw = p.row?.unitPrice;
        if (!raw) return "";
        const num = Number(raw);
        return num.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Órdenes del usuario #{id}
      </Typography>

      {/* ─── Tabla de ordenes ─── */}
      <DataGrid
        autoHeight
        rows={rows}
        columns={orderColumns}
        loading={loading}
        pageSize={10}
        disableRowSelectionOnClick
        getRowId={(row) => row.orderId}
        onRowClick={(params) => setSelected(params.row)}
      />

      {/* ─── Tabla de items (solo si hay seleccion) ─── */}
      {selected && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Ítems de la orden #{selected.orderId}
          </Typography>

          <DataGrid
            autoHeight
            rows={selected.items}
            columns={itemColumns}
            hideFooter
            getRowId={(row) => `${row.productId}-${row.description}`}
          />
        </>
      )}

      <Button
        component={Link}
        to="/admin/users"
        sx={{ mt: 3 }}
        variant="outlined"
      >
        Volver a usuarios
      </Button>
    </Box>
  );
}
