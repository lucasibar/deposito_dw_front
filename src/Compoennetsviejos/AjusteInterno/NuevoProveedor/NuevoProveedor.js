import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { generarNuevoProveedor } from '../../../redux/actions';

export default function NuevoProveedor({ handleClose }) {
  const dispatch = useDispatch();
  const [nombreProveedor, setNombreProveedor] = useState('');

  const handleAgregarProveedor = () => {
    if (nombreProveedor.trim() === '') {
      alert('El nombre del proveedor no puede estar vacío');
      return;
    }
    // Dispatch para crear el nuevo proveedor
    dispatch(generarNuevoProveedor({ nombre: nombreProveedor, categoria: 'cliente' }));
    handleClose(); // Cerrar el modal o el componente después de la acción
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      <TextField
        label="Nombre del nuevo cliente"
        value={nombreProveedor}
        onChange={(e) => setNombreProveedor(e.target.value)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleAgregarProveedor}>
        Cargar cliente
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleClose}>
        Cancelar
      </Button>
    </Box>
  );
}
