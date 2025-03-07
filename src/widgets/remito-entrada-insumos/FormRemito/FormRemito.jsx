import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Paper
} from '@mui/material';
import { dataProveedoresItems } from '../../../features/remitos/model/slice';
import styles from './FormRemito.module.css';

export const FormRemito = () => {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.remitos.proveedores) || [];

  useEffect(() => {
    dispatch(dataProveedoresItems());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    proveedor: '',
    fecha: '',
    numeroRemito: '',
    item: '',
    kilos: '',
    unidades: '',
    partida: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de envío
  };

  return (
    <Paper className={styles.formContainer}>
      <Typography variant="h6" gutterBottom>
        Datos del Remito
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box className={styles.formGrid}>
          <TextField
            select
            label="Proveedor"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {proveedores.map((prov) => (
              <MenuItem key={prov.id} value={prov.id}>
                {prov.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="Fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />

          <TextField
            label="Número de Remito"
            name="numeroRemito"
            value={formData.numeroRemito}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Item"
            name="item"
            value={formData.item}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Kilos"
            name="kilos"
            type="number"
            value={formData.kilos}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Unidades"
            name="unidades"
            type="number"
            value={formData.unidades}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            label="Partida"
            name="partida"
            value={formData.partida}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>

        <Box className={styles.buttonContainer}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Agregar al Remito
          </Button>
        </Box>
      </form>
    </Paper>
  );
}; 