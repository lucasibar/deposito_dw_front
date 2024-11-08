import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, FormControl, InputLabel, Select, MenuItem, Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { seleccionarProveedor, getItems, seleccionarItem, limpiarProveedorSeleccionado } from '../../../../redux/actions';

export default function ManejadoresItems() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(limpiarProveedorSeleccionado());
  }, [dispatch]);

  // Proveedores
  const proveedoresRedux = useSelector((state) => state.proveedores);
  const [proveedores, setProveedores] = useState([]);
  useEffect(() => {
    setProveedores(proveedoresRedux);
  }, [proveedoresRedux]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");

  const handleChangeProveedor = (e) => {
    dispatch(seleccionarProveedor(e.target.value));
    setProveedorSeleccionado(e.target.value);

    if (e.target.value.id) {
      dispatch(getItems(e.target.value));
    } else {
      dispatch(seleccionarItem(""));
      setItemSeleccionado("");
    }
  };

  // Items
  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  useEffect(() => {
    setItems(itemsRedux);
  }, [itemsRedux]);

  const handleItemChange = (event, newValue) => {
    setItemSeleccionado(newValue);
    dispatch(seleccionarItem(newValue));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Selector de Proveedores */}
        <Grid item xs={4} sm={4} md={4}>
          <FormControl fullWidth>
            <InputLabel id="proveedor-label">Proveedores</InputLabel>
            <Select
              labelId="proveedor-label"
              id="proveedor"
              value={proveedorSeleccionado}
              onChange={handleChangeProveedor}
            >
              <MenuItem value="">TODOS</MenuItem>
              <MenuItem value="VACIOS">VACIOS</MenuItem>
              {proveedores?.map((prov, i) => (
                <MenuItem key={i} value={prov}>{prov.nombre}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Autocomplete para Items */}
        <Grid item xs={8} sm={8} md={8}>
          <Autocomplete
            options={items}
            getOptionLabel={(option) => `${option.categoria} ${option.descripcion}`}
            value={itemSeleccionado}
            onChange={handleItemChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar item"
                placeholder="Escribe para buscar..."
                variant="outlined"
                fullWidth
                disabled={!proveedorSeleccionado}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
