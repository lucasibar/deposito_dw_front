import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { adicionRapida } from '../../../features/posicion/model/slice';
import { dataProveedoresItems } from '../../../features/remitos/model/slice';

export const AdicionRapidaModal = ({ open, onClose, posicion }) => {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.remitos.proveedores);
  
  const [formData, setFormData] = useState({
    proveedor: '',
    item: '',
    kilos: '',
    unidades: '',
    partida: '',
    tipoMovimiento: 'ajusteSUMA'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar proveedores cuando se abra el modal
  useEffect(() => {
    if (open && (!proveedores || proveedores.length === 0)) {
      dispatch(dataProveedoresItems());
    }
  }, [open, dispatch, proveedores]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.proveedor || !formData.item || !formData.partida || 
        !formData.kilos || !formData.unidades) {
      setError('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const adicionData = {
        proveedor: formData.proveedor,
        tipoMovimiento: formData.tipoMovimiento,
        item: formData.item,
        kilos: parseFloat(formData.kilos),
        unidades: parseInt(formData.unidades),
        partida: formData.partida,
        posicion: posicion?.posicionId || ''
      };

      dispatch(adicionRapida(adicionData));
      onClose();
      setFormData({
        proveedor: '',
        item: '',
        kilos: '',
        unidades: '',
        partida: '',
        tipoMovimiento: 'ajusteSUMA'
      });
    } catch (error) {
      setError('Error al agregar el item. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({
        proveedor: '',
        item: '',
        kilos: '',
        unidades: '',
        partida: '',
        tipoMovimiento: 'ajusteSUMA'
      });
      setError('');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Adición Rápida - {posicion?.pasillo 
          ? `Pasillo ${posicion.pasillo}`
          : `Rack ${posicion?.rack} - Fila ${posicion?.fila} - Nivel ${posicion?.AB}`
        }
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <FormControl fullWidth required>
            <InputLabel>Proveedor</InputLabel>
            <Select
              value={formData.proveedor}
              label="Proveedor"
              onChange={(e) => handleInputChange('proveedor', e.target.value)}
              disabled={!proveedores || proveedores.length === 0}
            >
              {proveedores?.map((prov) => (
                <MenuItem key={prov.id} value={prov}>
                  {prov.nombre}
                </MenuItem>
              ))}
            </Select>
            {(!proveedores || proveedores.length === 0) && (
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                Cargando proveedores...
              </Typography>
            )}
          </FormControl>
          
          <TextField
            fullWidth
            label="Descripción del Item"
            value={formData.item}
            onChange={(e) => handleInputChange('item', e.target.value)}
            required
          />
          
          <TextField
            fullWidth
            label="Partida"
            value={formData.partida}
            onChange={(e) => handleInputChange('partida', e.target.value)}
            required
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Kilos"
              type="number"
              value={formData.kilos}
              onChange={(e) => handleInputChange('kilos', e.target.value)}
              required
            />
            
            <TextField
              fullWidth
              label="Unidades"
              type="number"
              value={formData.unidades}
              onChange={(e) => handleInputChange('unidades', e.target.value)}
              required
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Agregando...' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 