import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../redux/slices/productSlice";
import CategorySelect from "../../components/CategorySelect";

/* ───────── Validación ───────── */
const schema = yup.object({
  description: yup.string().required("Descripción requerida"),
  price: yup
    .number()
    .typeError("Debe ser un número")
    .positive("Precio > 0")
    .required("Precio requerido"),
  stock: yup
    .number()
    .typeError("Debe ser un número")
    .min(0, "Stock >= 0")
    .required("Stock requerido"),
  discount: yup
    .number()
    .typeError("Debe ser un número")
    .min(0, "≥ 0 %")
    .max(100, "≤ 100 %")
    .required("Descuento requerido"),
  categoryId: yup.number().required("Categoría requerida"),
});

export default function ProductForm({ open, onClose, initialData }) {
  const dispatch = useDispatch();

  /* default values (incluye discount) */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: initialData?.description || "",
      price: initialData?.price || "",
      stock: initialData?.stock || "",
      discount: initialData?.discount ?? 0,
      categoryId: initialData?.categoryId || "",
    },
  });

  const onSubmit = (data) => {
    // valueAsNumber para precio, stock, discount
    const payload = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount),
    };

    if (initialData) {
      dispatch(updateProduct({ id: initialData.id, ...payload }));
    } else {
      dispatch(createProduct(payload));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Editar producto" : "Nuevo producto"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Descripción"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />

            <TextField
              label="Precio"
              type="number"
              fullWidth
              inputProps={{ min: 0, step: "0.01" }}
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />

            <TextField
              label="Descuento (%)"
              type="number"
              fullWidth
              inputProps={{ min: 0, max: 100, step: "0.01" }}
              error={!!errors.discount}
              helperText={errors.discount?.message}
              {...register("discount", { valueAsNumber: true })}
            />

            <TextField
              label="Stock"
              type="number"
              fullWidth
              inputProps={{ min: 0 }}
              error={!!errors.stock}
              helperText={errors.stock?.message}
              {...register("stock", { valueAsNumber: true })}
            />

            <CategorySelect
              register={register}
              error={errors.categoryId}
              defaultValue={initialData?.categoryId}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
