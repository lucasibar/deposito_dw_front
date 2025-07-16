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
  Alert,
  Autocomplete
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

// Modal para eliminación rápida
export const EliminacionRapidaModal = ({ open, onClose, item, posicion }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    kilos: '',
    unidades: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.kilos || !formData.unidades) {
      setError('Por favor complete todos los campos');
      return;
    }

    // Validar que no se elimine más de lo disponible
    if (parseInt(formData.kilos) > item.kilos) {
      setError(`No puede eliminar más de ${item.kilos} kilos disponibles`);
      return;
    }

    if (parseInt(formData.unidades) > item.unidades) {
      setError(`No puede eliminar más de ${item.unidades} unidades disponibles`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const adicionData = {
        proveedor: item.proveedor,
        tipoMovimiento: 'ajusteRESTA',
        item: item,
        kilos: parseInt(formData.kilos),
        unidades: parseInt(formData.unidades),
        partida: item.partida,
        posicion: posicion?.posicionId || posicion?.id || ''
      };

      await dispatch(adicionRapida(adicionData));
      onClose();
      setFormData({
        kilos: '',
        unidades: ''
      });
    } catch (error) {
      setError('Error al eliminar el item. Por favor intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setFormData({
        kilos: '',
        unidades: ''
      });
      setError('');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Eliminación Rápida - {item?.descripcion}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Typography variant="body2" color="textSecondary">
            <strong>Proveedor:</strong> {item?.proveedor?.nombre}
          </Typography>
          
          <Typography variant="body2" color="textSecondary">
            <strong>Partida:</strong> {item?.partida}
          </Typography>
          
          <Typography variant="body2" color="textSecondary">
            <strong>Disponible:</strong> {item?.kilos} kilos, {item?.unidades} unidades
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Kilos a eliminar"
              type="number"
              inputProps={{ step: 1, min: 0, max: item?.kilos }}
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
              label="Unidades a eliminar"
              type="number"
              inputProps={{ step: 1, min: 0, max: item?.unidades }}
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
          color="error"
          disabled={loading}
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
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
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Autocomplete
                options={proveedores || []}
                getOptionLabel={(option) => option ? option.nombre || '' : ''}
                value={formData.proveedor}
                onChange={(event, newValue) => handleInputChange('proveedor', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proveedor"
                    required
                    placeholder="Buscar proveedor..."
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.nombre}
                  </Box>
                )}
                noOptionsText="No se encontraron proveedores"
                loading={!proveedores || proveedores.length === 0}
                loadingText="Cargando proveedores..."
                filterOptions={(options, { inputValue }) => {
                  const filtered = options.filter(option =>
                    option.nombre.toLowerCase().includes(inputValue.toLowerCase())
                  );
                  return filtered;
                }}
              />
              <Button 
                size="small" 
                onClick={() => setOpenNuevoProveedor(true)}
                sx={{ 
                  color: '#2ecc71', 
                  alignSelf: 'flex-start',
                  textTransform: 'none'
                }}
              >
                + Agregar nuevo proveedor
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Autocomplete
                options={itemsProveedor}
                getOptionLabel={(option) => option ? `${option.categoria || ''} - ${option.descripcion || ''}` : ''}
                value={formData.item}
                onChange={(event, newValue) => handleInputChange('item', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Item"
                    required
                    placeholder="Buscar item..."
                    disabled={!formData.proveedor}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {option.categoria}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {option.descripcion}
                      </Typography>
                    </Box>
                  </Box>
                )}
                noOptionsText={
                  formData.proveedor ? "No se encontraron items" : "Seleccione un proveedor primero"
                }
                filterOptions={(options, { inputValue }) => {
                  const filtered = options.filter(option =>
                    option.categoria.toLowerCase().includes(inputValue.toLowerCase()) ||
                    option.descripcion.toLowerCase().includes(inputValue.toLowerCase())
                  );
                  return filtered;
                }}
              />
              {formData.proveedor && (
                <Button 
                  size="small" 
                  onClick={() => setOpenNuevoItem(true)}
                  sx={{ 
                    color: '#2ecc71', 
                    alignSelf: 'flex-start',
                    textTransform: 'none'
                  }}
                >
                  + Agregar nuevo item
                </Button>
              )}
            </Box>
            
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