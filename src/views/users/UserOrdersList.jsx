import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getOrdersByUser } from "../../redux/slices/orderSlice";

export default function UserOrdersList() {
  const { id } = useParams();          // userId
  const dispatch = useDispatch();

  const { orders = [], loading } = useSelector((s) => s.orders);
  const [selected, setSelected] = useState(null); // orden seleccionada

  /* ─────── Cargar órdenes al montar ─────── */
  useEffect(() => {
    dispatch(getOrdersByUser(id));
  }, [dispatch, id]);

  /* ─────── Enriquecemos filas con info derivada ─────── */
  const rows = useMemo(
    () =>
      orders.map((o) => {
        const items = o.items ?? [];
        const total = items.reduce((sum, it) => {
          const qty   = Number(it.quantity)   || 0;
          const price = Number(it.unitPrice)  || 0;
          return sum + qty * price;
        }, 0);
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

  /* ─────── Columnas de la tabla de órdenes ─────── */
  const orderColumns = [
    { field: "orderId", headerName: "ID", width: 80 },
    { field: "userName", headerName: "Usuario", width: 140 },
    { field: "itemsCount", headerName: "Items", width: 90 },
    { field: "products", headerName: "Productos", flex: 1 },
    {
      field: "total",
      headerName: "Total ($)",
      width: 120,
      valueFormatter: (p) =>
        typeof p.value === "number"
        ? p.value.toLocaleString("es-AR", { minimumFractionDigits: 2 })
        : p.value,
    },
  ];

  /* ─────── Columnas de la tabla de ítems ─────── */
  const itemColumns = [
    { field: "productId", headerName: "Producto ID", width: 120 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "category", headerName: "Categoría", width: 160 },
    { field: "quantity", headerName: "Cant.", width: 90 },
    {
      field: "unitPrice",
      headerName: "Precio unit.",
      width: 120,

      /* Pintamos la celda directamente */
      renderCell: (p) => {
        const raw = p.row?.unitPrice;          // "19999.99"  (string)
        if (!raw) return "";                   // aún no llegó

        const num = Number(raw);
        return num.toLocaleString("es-AR", { minimumFractionDigits: 2 });
      },
    },
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Órdenes del usuario #{id}
      </Typography>

      {/* ────── Tabla de órdenes ────── */}
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

      {/* ────── Tabla de ítems (solo si hay selección) ────── */}
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
