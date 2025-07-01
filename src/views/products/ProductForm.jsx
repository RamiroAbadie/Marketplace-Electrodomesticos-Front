import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Stack
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/slices/productSlice';
import CategorySelect from '../../components/CategorySelect';

const schema = yup.object({
  description: yup.string().required('Descripción requerida'),
  price: yup.number().positive('Precio > 0').required('Precio requerido'),
  stock: yup.number().min(0, 'Stock >= 0').required('Stock requerido'),
  categoryId: yup.number().required(),
});

export default function ProductForm({ open, onClose, initialData }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData ?? { description: '', price: '', stock: '', categoryId: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (initialData) {
      dispatch(updateProduct({ id: initialData.id, ...data }));
    } else {
      dispatch(createProduct(data));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Editar producto' : 'Nuevo producto'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Descripción"
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description')}
            />
            <TextField
              label="Precio"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message}
              {...register('price')}
            />
            <TextField
              label="Stock"
              type="number"
              fullWidth
              error={!!errors.stock}
              helperText={errors.stock?.message}
              {...register('stock')}
            />
            <CategorySelect register={register} error={errors.categoryId} defaultValue={initialData?.categoryId} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
