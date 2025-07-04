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
import axios from 'axios';

const URL = "https://derwill-deposito-backend.onrender.com";

// Categorías para nuevos items
const CATEGORIAS = [
  "costura", "algodon", "algodon-color", "nylon", "nylon REC", "nylon-color", "lycra", "lycra REC", 
  "goma", "tarugo", "etiqueta", "bolsa", "percha", "ribbon", "caja", 
  "cinta", "plantilla", "film", "consumibes(aceite y parafina)", "faja", "caballete"
];

// Modal para crear nuevo proveedor
const ModalNuevoProveedor = ({ open, onClose, onProveedorCreado }) => {
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

// Modal para crear nuevo item
const ModalNuevoItem = ({ open, onClose, proveedor, onItemCreado }) => {
  const [nuevoItem, setNuevoItem] = useState({
    descripcion: "",
    categoria: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!nuevoItem.descripcion || !nuevoItem.categoria) {
      alert('Por favor complete todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${URL}/items`, {
        descripcion: nuevoItem.descripcion,
        categoria: nuevoItem.categoria,
        proveedor: proveedor
      });

      onItemCreado(response.data);
      setNuevoItem({ descripcion: "", categoria: "" });
      onClose();
    } catch (error) {
      alert('Error al crear el item');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Nuevo Item</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              value={nuevoItem.categoria}
              label="Categoría"
              onChange={(e) => setNuevoItem({...nuevoItem, categoria: e.target.value})}
            >
              {CATEGORIAS.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Descripción"
            value={nuevoItem.descripcion}
            onChange={(e) => setNuevoItem({...nuevoItem, descripcion: e.target.value})}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const AdicionRapidaModal = ({ open, onClose, posicion }) => {
  const dispatch = useDispatch();
  const proveedores = useSelector((state) => state.remitos.proveedores);
  const allItems = useSelector((state) => state.remitos.items || []);
  
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
  
  // Estados para los modales
  const [openNuevoProveedor, setOpenNuevoProveedor] = useState(false);
  const [openNuevoItem, setOpenNuevoItem] = useState(false);

  // Filtrar items por proveedor seleccionado
  const itemsProveedor = formData.proveedor 
    ? allItems.filter(item => item.proveedor?.id === formData.proveedor.id)
    : [];

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

  const handleProveedorCreado = (nuevoProveedor) => {
    dispatch(dataProveedoresItems());
    setFormData(prev => ({
      ...prev,
      proveedor: nuevoProveedor
    }));
  };

  const handleItemCreado = (nuevoItem) => {
    dispatch(dataProveedoresItems());
    setFormData(prev => ({
      ...prev,
      item: nuevoItem
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
        kilos: parseInt(formData.kilos),
        unidades: parseInt(formData.unidades),
        partida: formData.partida,
        posicion: posicion?.id || posicion?.posicionId || ''
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
    <>
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
                <MenuItem value="" onClick={() => setOpenNuevoProveedor(true)}>
                  <em>+ Agregar nuevo proveedor</em>
                </MenuItem>
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
            
            <FormControl fullWidth required>
              <InputLabel>Item</InputLabel>
              <Select
                value={formData.item}
                label="Item"
                onChange={(e) => handleInputChange('item', e.target.value)}
                disabled={!formData.proveedor}
              >
                <MenuItem value="" onClick={() => setOpenNuevoItem(true)}>
                  <em>+ Agregar nuevo item</em>
                </MenuItem>
                {itemsProveedor.length > 0 ? (
                  itemsProveedor.map((item) => (
                    <MenuItem key={item.id} value={item}>
                      {`${item.categoria} - ${item.descripcion}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>
                    No hay items disponibles para este proveedor
                  </MenuItem>
                )}
              </Select>
            </FormControl>
            
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
                inputProps={{ step: 1, min: 0 }}
                value={formData.kilos}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    handleInputChange('kilos', value);
                  }
                }}
                required
              />
              
              <TextField
                fullWidth
                label="Unidades"
                type="number"
                inputProps={{ step: 1, min: 0 }}
                value={formData.unidades}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d+$/.test(value)) {
                    handleInputChange('unidades', value);
                  }
                }}
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

      <ModalNuevoProveedor 
        open={openNuevoProveedor}
        onClose={() => setOpenNuevoProveedor(false)}
        onProveedorCreado={handleProveedorCreado}
      />

      <ModalNuevoItem 
        open={openNuevoItem}
        onClose={() => setOpenNuevoItem(false)}
        proveedor={formData.proveedor}
        onItemCreado={handleItemCreado}
      />
    </>
  );
}; 