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
  createCategory,
  updateCategory,
} from "../../redux/slices/categorySlice";

/* ──────── Validación con yup ──────── */
const schema = yup.object({
  description: yup
    .string()
    .trim()
    .required("La descripción es obligatoria")
    .max(60, "Máx. 60 caracteres"),
});

export default function CategoryForm({ open, onClose, initialData }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    /* Si viene `initialData` (modo edición) usamos los valores, si no, campo vacío */
    defaultValues: { description: initialData?.description ?? "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (initialData) {
      /* Editar */
      dispatch(updateCategory({ id: initialData.id, ...data }));
    } else {
      /* Crear */
      dispatch(createCategory(data.description));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Editar categoría" : "Nueva categoría"}
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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
