import React from 'react';
import { useSelector } from 'react-redux';
import { TextField, MenuItem } from '@mui/material';

export const ItemsSearchBar = ({ proveedor, setItem, inputStyle }) => {
  const items = useSelector((state) => state.remito.items);

  const filteredItems = proveedor 
    ? items.filter(item => item.proveedor.id === proveedor.id)
    : [];

  return (
    <TextField
      label="Item"
      select
      onChange={(e) => setItem(e.target.value)}
      disabled={!proveedor}
      {...inputStyle}
    >
      {filteredItems.map((item) => (
        <MenuItem key={item.id} value={item}>
          {`${item.categoria} ${item.descripcion}`}
        </MenuItem>
      ))}
    </TextField>
  );
}; 