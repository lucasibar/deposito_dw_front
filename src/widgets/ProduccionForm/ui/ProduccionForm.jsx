import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, MenuItem, CircularProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduccionTemporal, subirProduccionDiaria, updateProduccionTemporal } from '../../../features/produccion/model/slice';
import { maquinasService } from '../../../features/maquinas/api/maquinasService';
import { legajosService } from '../../../features/legajos/api/legajosService';
import { articulosService } from '../../../features/articulos/api/articulosService';
import { ListaProduccion } from './ListaProduccion';
import Swal from 'sweetalert2';

const TIPOS_MAQUINA = [
  'tejeduria',
  'plancha',
  'costura',
  'terminado'
];

const CATEGORIAS_LEGAJO = [
  'tejeduria',
  'plancha',
  'costura',
  'terminado',
  'deposito'
];

// Componentes de Modal para cada tipo
const NuevaMaquinaModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tipoMaquina: '',
    numeroMaquina: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaMaquina = await maquinasService.createMaquina(formData);
      console.log('Máquina creada en el backend:', nuevaMaquina);
      onSave(nuevaMaquina);
      onClose();
    } catch (error) {
      console.error('Error al crear la máquina:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear la máquina'
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nueva Máquina</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Tipo de Máquina"
                name="tipoMaquina"
                value={formData.tipoMaquina}
                onChange={handleChange}
                required
              >
                {TIPOS_MAQUINA.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Máquina"
                name="numeroMaquina"
                value={formData.numeroMaquina}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const NuevoLegajoModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    numeroLegajo: '',
    categoria: 'tejeduria',
    turno: 'mañana'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos del legajo a enviar:', formData);
      const nuevoLegajo = await legajosService.createLegajo(formData);
      console.log('Legajo creado en el backend:', nuevoLegajo);
      onSave(nuevoLegajo);
      onClose();
    } catch (error) {
      console.error('Error al crear el legajo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el legajo'
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nuevo Legajo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Legajo"
                name="numeroLegajo"
                value={formData.numeroLegajo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Turno"
                name="turno"
                value={formData.turno}
                onChange={handleChange}
                required
              >
                <MenuItem value="mañana">Mañana</MenuItem>
                <MenuItem value="noche">Noche</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Categoría"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                {CATEGORIAS_LEGAJO.map((categoria) => (
                  <MenuItem key={categoria} value={categoria}>
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const NuevoArticuloModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    codigoArticulo: '',
    talle: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoArticulo = await articulosService.createArticulo(formData);
      onSave(nuevoArticulo);
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el artículo'
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nuevo Artículo</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Código de Artículo"
                name="codigoArticulo"
                value={formData.codigoArticulo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Talle"
                name="talle"
                value={formData.talle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const ProduccionForm = () => {
  const dispatch = useDispatch();
  const { loading = false, error = null, produccionesTemporales = [] } = useSelector(state => state.produccion) || {};
  
  const [maquinas, setMaquinas] = useState([]);
  const [legajos, setLegajos] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  // Estados para controlar los modales
  const [openMaquinaModal, setOpenMaquinaModal] = useState(false);
  const [openLegajoModal, setOpenLegajoModal] = useState(false);
  const [openArticuloModal, setOpenArticuloModal] = useState(false);

  const [formData, setFormData] = useState({
    maquina: '',
    legajo: '',
    unidades: '',
    fecha: new Date().toISOString().split('T')[0],
    articulo: '',
    numeroLoteProduccion: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maquinasData, legajosData, articulosData] = await Promise.all([
          maquinasService.getAllMaquinas(),
          legajosService.getAllLegajos(),
          articulosService.getAllArticulos()
        ]);

        setMaquinas(maquinasData || []);
        setLegajos(legajosData || []);
        setArticulos(articulosData || []);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === 'nuevo') {
      switch (name) {
        case 'maquina':
          setOpenMaquinaModal(true);
          break;
        case 'legajo':
          setOpenLegajoModal(true);
          break;
        case 'articulo':
          setOpenArticuloModal(true);
          break;
        default:
          break;
      }
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNuevaMaquina = (nuevaMaquina) => {
    console.log('Nueva máquina recibida:', nuevaMaquina);
    console.log('Estado actual de máquinas:', maquinas);
    setMaquinas(prev => {
      console.log('Estado previo:', prev);
      const newState = [...prev, nuevaMaquina];
      console.log('Nuevo estado:', newState);
      return newState;
    });
    setFormData(prev => ({ ...prev, maquina: nuevaMaquina.id }));
  };

  const handleNuevoLegajo = (nuevoLegajo) => {
    console.log('Nuevo legajo recibido:', nuevoLegajo);
    console.log('Estado actual de legajos:', legajos);
    setLegajos(prev => {
      console.log('Estado previo de legajos:', prev);
      const newState = [...prev, nuevoLegajo];
      console.log('Nuevo estado de legajos:', newState);
      return newState;
    });
    setFormData(prev => ({ ...prev, legajo: nuevoLegajo.id }));
  };

  const handleNuevoArticulo = (nuevoArticulo) => {
    setArticulos(prev => [...prev, nuevoArticulo]);
    setFormData(prev => ({ ...prev, articulo: nuevoArticulo.id }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingIndex !== null) {
        dispatch(updateProduccionTemporal({ index: editingIndex, produccion: formData }));
        setEditingIndex(null);
      } else {
        dispatch(addProduccionTemporal(formData));
      }

      setFormData({
        maquina: '',
        legajo: '',
        unidades: '',
        fecha: new Date().toISOString().split('T')[0],
        articulo: '',
        numeroLoteProduccion: ''
      });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: editingIndex !== null ? 'Producción actualizada correctamente' : 'Producción agregada correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message || 'Error al procesar la producción'
      });
    }
  };

  const handleEdit = (produccion, index) => {
    setFormData(produccion);
    setEditingIndex(index);
  };

  const handleSubirProduccion = async () => {
    if (!produccionesTemporales?.length) {
      Swal.fire({
        title: "Error",
        text: "Debe agregar al menos una producción.",
        icon: "error"
      });
      return;
    }

    try {
      await dispatch(subirProduccionDiaria(produccionesTemporales)).unwrap();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producción diaria registrada correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.message || 'Error al registrar la producción diaria'
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2">
                Registro de Producción Diaria
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSubirProduccion}
                disabled={!produccionesTemporales?.length || loading}
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
                {loading ? 'Subiendo Producción...' : 'Subir Producción Diaria'}
              </Button>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Máquina"
                    name="maquina"
                    value={formData.maquina}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <MenuItem value="nuevo" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      + Agregar Nueva Máquina
                    </MenuItem>
                    {(maquinas || []).map((maquina) => (
                      <MenuItem key={maquina.id} value={maquina.id}>
                        {maquina.tipoMaquina} - #{maquina.numeroMaquina}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Legajo"
                    name="legajo"
                    value={formData.legajo}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <MenuItem value="nuevo" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      + Agregar Nuevo Legajo
                    </MenuItem>
                    {(legajos || []).map((legajo) => (
                      <MenuItem key={legajo.id} value={legajo.id}>
                        {legajo.nombre} - #{legajo.numeroLegajo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Unidades"
                    name="unidades"
                    type="number"
                    value={formData.unidades}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
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
                    <MenuItem value="nuevo" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      + Agregar Nuevo Artículo
                    </MenuItem>
                    {(articulos || []).map((articulo) => (
                      <MenuItem key={articulo.id} value={articulo.id}>
                        {articulo.codigoArticulo} - {articulo.talle}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número de Lote Producción"
                    name="numeroLoteProduccion"
                    value={formData.numeroLoteProduccion}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    disabled={loading}
                  >
                    {editingIndex !== null ? 'Actualizar Producción' : 'Agregar Producción'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>

        {/* Columna derecha - Lista de Producciones */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Lista de Producciones
            </Typography>
            <ListaProduccion onEdit={handleEdit} />
          </Paper>
        </Box>
      </Box>

      {/* Modales para crear nuevos items */}
      <NuevaMaquinaModal
        open={openMaquinaModal}
        onClose={() => setOpenMaquinaModal(false)}
        onSave={handleNuevaMaquina}
      />
      <NuevoLegajoModal
        open={openLegajoModal}
        onClose={() => setOpenLegajoModal(false)}
        onSave={handleNuevoLegajo}
      />
      <NuevoArticuloModal
        open={openArticuloModal}
        onClose={() => setOpenArticuloModal(false)}
        onSave={handleNuevoArticulo}
      />
    </Box>
  );
}; 