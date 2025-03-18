import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { dataProveedoresItems, setFormData } from '../../../features/remitos/model/slice';
import styles from './FormRemito.module.css';
import { ModalAgregarPartida } from '../ModalAgregarPartida/ModalAgregarPartida';
import { ModalAgregarProveedor } from '../ModalAgregarProveedor/ModalAgregarProveedor';

export const FormRemito = () => {
  const dispatch = useDispatch();
  const remitosState = useSelector((state) => state.remitos);
  const loading = remitosState?.loading;
  const proveedores = remitosState?.proveedores || [];
  const formData = useSelector(state => state.remitos?.formData || {});

  const [openModal, setOpenModal] = useState(false);
  const [openProveedorModal, setOpenProveedorModal] = useState(false);

  useEffect(() => {
    dispatch(dataProveedoresItems());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({
      ...formData,
      [name]: value
    }));
  };

  const handleOpenModal = () => {
    if (!formData.proveedor) {
      alert('Por favor seleccione un proveedor primero');
      return;
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleProveedorCreado = (nuevoProveedor) => {
    dispatch(dataProveedoresItems());
    dispatch(setFormData({
      ...formData,
      proveedor: nuevoProveedor.id
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper className={styles.formContainer}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        mb: 2
      }}>
        <TextField
          select
          label="Proveedor"
          name="proveedor"
          value={formData.proveedor}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#2ecc71',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#2ecc71',
            }
          }}
        >
          <MenuItem value="" onClick={() => setOpenProveedorModal(true)}>
            <em>+ Agregar nuevo proveedor</em>
          </MenuItem>
          {Array.isArray(proveedores) && proveedores.map((prov) => (
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
      </Box>

      <Box className={styles.buttonContainer}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleOpenModal}
          sx={{
            color: '#2ecc71',
            borderColor: '#2ecc71',
            '&:hover': {
              borderColor: '#27ae60',
              color: '#27ae60',
              bgcolor: 'transparent'
            }
          }}
        >
          Agregar Partida
        </Button>
      </Box>

      <ModalAgregarPartida 
        open={openModal}
        onClose={handleCloseModal}
        proveedorId={formData.proveedor}
      />

      <ModalAgregarProveedor 
        open={openProveedorModal}
        onClose={() => setOpenProveedorModal(false)}
        onProveedorCreado={handleProveedorCreado}
      />
    </Paper>
  );
}; 