import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from "../redux/slices/categorySlice";
import { TextField, MenuItem } from '@mui/material';

export default function CategorySelect({ register, error, defaultValue }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((s) => s.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <TextField
      select
      label="Categoría"
      fullWidth
      defaultValue={defaultValue ?? ''}
      error={!!error}
      helperText={error?.message}
      {...register('categoryId', { required: 'Seleccioná una categoría' })}
    >
      {categories.map((c) => (
        <MenuItem key={c.id} value={c.id}>
          {c.description}
        </MenuItem>
      ))}
    </TextField>
  );
}
