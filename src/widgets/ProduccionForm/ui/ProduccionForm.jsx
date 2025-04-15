import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, CircularProgress, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduccionTemporal, clearProduccionesTemporales, createProducciones, removeProduccionTemporal } from '../../../features/produccion/model/slice';
import { selectProduccionesTemporales, selectProduccionLoading, selectProduccionError } from '../../../features/produccion/model/slice';
import { selectMovimientos, calculateStockByPO } from '../../../features/movimientos_articulos/model/slice';
import { articulosService } from '../../../features/articulos/api/articulosService';
import { ListaProduccion } from './ListaProduccion';
import Swal from 'sweetalert2';

export const ProduccionForm = () => {
  const dispatch = useDispatch();
  const produccionesTemporales = useSelector(selectProduccionesTemporales);
  const loading = useSelector(selectProduccionLoading);
  const error = useSelector(selectProduccionError);
  const movimientos = useSelector(selectMovimientos);
  
  const [articulos, setArticulos] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    articulo: '',
    cantidad: '',
    numeroLoteProduccion: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articulosData = await articulosService.getAllArticulos();
        setArticulos(articulosData || []);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stock by PO
  const stockByPO = calculateStockByPO(movimientos);

  // Filter articles that need to be produced (have stock > 0)
  const articulosParaProducir = articulos.filter(articulo => {
    const stock = stockByPO[articulo.numeroPO] || 0;
    return stock > 0;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateNumeroLote = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleAddProduccion = () => {
    if (!formData.articulo || !formData.cantidad) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos'
      });
      return;
    }

    const articuloSeleccionado = articulos.find(a => a.id === formData.articulo);
    const stockDisponible = stockByPO[articuloSeleccionado.numeroPO] || 0;

    if (parseInt(formData.cantidad) > stockDisponible) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `La cantidad no puede ser mayor al stock disponible (${stockDisponible})`
      });
      return;
    }

    const nuevaProduccion = {
      articulo: formData.articulo,
      cantidad: parseInt(formData.cantidad),
      numeroLoteProduccion: generateNumeroLote(),
      numeroPO: articuloSeleccionado.numeroPO
    };

    dispatch(addProduccionTemporal(nuevaProduccion));
    setFormData({
      articulo: '',
      cantidad: '',
      numeroLoteProduccion: ''
    });
  };

  const handleSubmitAll = async () => {
    if (produccionesTemporales.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe agregar al menos una producción'
      });
      return;
    }

    try {
      await dispatch(createProducciones(produccionesTemporales)).unwrap();
      
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producciones guardadas correctamente'
      });
      
      dispatch(clearProduccionesTemporales());
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Error al guardar las producciones'
      });
    }
  };

  if (loadingData) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '300px' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 3, 
      height: '100%',
      bgcolor: '#f5f5f5',
      p: 3,
      mt: 8,
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        flex: 1,
        mt: 2,
        px: 3
      }}>
        {/* Columna izquierda - Formulario */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Registro de Producción
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Artículo"
                  name="articulo"
                  value={formData.articulo}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  {articulosParaProducir.map((articulo) => (
                    <MenuItem key={articulo.id} value={articulo.id}>
                      {articulo.codigoArticulo} - {articulo.talle} (Stock: {stockByPO[articulo.numeroPO] || 0})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  name="cantidad"
                  type="number"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={handleAddProduccion}
                  disabled={loading}
                >
                  Agregar Producción
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Columna derecha - Lista de Producciones */}
        <Box sx={{ flex: 1 }}>
          <ListaProduccion 
            articulos={articulos}
            onEdit={(produccion, index) => {
              setFormData({
                articulo: produccion.articulo,
                cantidad: produccion.cantidad,
                numeroLoteProduccion: produccion.numeroLoteProduccion
              });
              dispatch(removeProduccionTemporal(index));
            }}
            onSaveAll={handleSubmitAll}
            loading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
};  