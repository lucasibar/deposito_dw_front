import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

export const ModalAgregarProveedor = ({ open, onClose, onProveedorCreado }) => {
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nombreProveedor.trim()) {
      alert('Por favor ingrese un nombre de proveedor');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${URL}/proveedores`, {
        nombre: nombreProveedor,
        categoria: "proveedor"
      });
      
      onProveedorCreado(response.data);
      setNombreProveedor('');
      onClose();
    } catch (error) {
      alert('Error al crear el proveedor');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre del Proveedor"
          type="text"
          fullWidth
          value={nombreProveedor}
          onChange={(e) => setNombreProveedor(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary"
          disabled={loading}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 