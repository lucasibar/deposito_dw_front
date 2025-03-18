import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Modal, 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  MenuItem 
} from '@mui/material';
import Swal from 'sweetalert2';
import { agregarAlRemitoSalida } from '../../../features/remito/model/slice';

export const RemitoSalidaModal = ({ open, onClose, item, posicionId }) => {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.remito.proveedores);
  const [proveedor, setProveedor] = useState('');
  const [kilos, setKilos] = useState(item.kilos);
  const [unidades, setUnidades] = useState(item.unidades);
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    setKilos(item.kilos);
    setUnidades(item.unidades);
  }, [item]);

  const handleCajasResta = (e) => {
    const value = parseInt(e.target.value);
    const kilosArestar = Math.round((item.kilos/item.unidades) * value);
    setKilos(kilosArestar);
    setUnidades(value);
  };

  const handleAjusteSubmit = () => {
    if (kilos > item.kilos || unidades > item.unidades) {
      Swal.fire({
        title: "Error",
        text: "No puede sacar más mercadería de la que hay disponible",
        icon: "error"
      });
      return;
    }

    dispatch(agregarAlRemitoSalida({
      item,
      proveedorId: proveedor,
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades),
      posicionId,
      fecha
    })).then(() => {
      onClose();
    });
  };

  const isFormValid = () => {
    return proveedor && fecha;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        padding: 4, 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        maxWidth: 400, 
        margin: 'auto', 
        marginTop: '10%' 
      }}>
        <Typography variant="h6">Agregar a Remito de salida</Typography>

        <TextField
          label="Proveedor"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          select
          fullWidth
          margin="normal"
        >
          {proveedores
            .filter(prov => prov.categoria?.toLowerCase().includes('cliente'))
            .map((prov) => (
              <MenuItem key={prov.id} value={prov.id}>
                {prov.nombre}
              </MenuItem>
            ))}
        </TextField>

        <Typography variant="h6" component="h6">
          Kilos {kilos}
        </Typography>
        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={handleCajasResta}
          fullWidth
          margin="normal"
        />

        <TextField
          fullWidth
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: '20px' }}
        />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 2,
          gap: 2
        }}>
          <IconButton onClick={onClose} color="error">
            Cancelar
          </IconButton>
          <IconButton 
            onClick={handleAjusteSubmit} 
            color="primary"
            disabled={!isFormValid()}
          >
            Aceptar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}; 