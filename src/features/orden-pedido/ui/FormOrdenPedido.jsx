import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchClientes,
  crearNuevoCliente,
  agregarPedido,
  agregarArticulo,
  crearArticulo,
  setClienteSeleccionado,
  eliminarArticulo,
  clearPedido,
} from '../model/slice';

const FormOrdenPedido = () => {
  const dispatch = useDispatch();
  const { clientes, clienteSeleccionado, articulosPedido, loading, error } = useSelector(
    (state) => state.ordenPedido
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', pais: '' });
  const [orden, setOrden] = useState({
    numeroPO: '',
    fecha: new Date().toISOString().split('T')[0],
    clienteId: '',
  });
  const [articulo, setArticulo] = useState({
    codigoArticulo: '',
    talle: '',
    cantidad: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    dispatch(fetchClientes());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNuevoCliente({ nombre: '', pais: '' });
  };

  const handleNuevoClienteChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleCrearCliente = async () => {
    try {
      await dispatch(crearNuevoCliente(nuevoCliente));
      handleCloseDialog();
      setSnackbarMessage('Cliente creado exitosamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al crear el cliente');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleOrdenChange = (e) => {
    setOrden({
      ...orden,
      [e.target.name]: e.target.value,
    });
  };

  const handleArticuloChange = (e) => {
    setArticulo({
      ...articulo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClienteChange = (e) => {
    const cliente = clientes.find((c) => c.id === e.target.value);
    dispatch(setClienteSeleccionado(cliente));
    setOrden({
      ...orden,
      clienteId: e.target.value,
    });
  };

  const handleAgregarArticulo = async () => {
    if (!articulo.codigoArticulo || !articulo.talle || !articulo.cantidad) {
      setSnackbarMessage('Por favor complete todos los campos del artículo');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Primero creamos el artículo
      const articuloCreado = await dispatch(crearArticulo({
        codigoArticulo: articulo.codigoArticulo,
        talle: articulo.talle,
      })).unwrap();

      // Luego lo agregamos al pedido
      dispatch(agregarArticulo({
        ...articulo,
        articuloId: articuloCreado.id,
      }));

      setArticulo({
        codigoArticulo: '',
        talle: '',
        cantidad: '',
      });
    } catch (error) {
      setSnackbarMessage('Error al crear el artículo');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleEliminarArticulo = (index) => {
    dispatch(eliminarArticulo(index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orden.numeroPO || !orden.fecha || !orden.clienteId) {
      setSnackbarMessage('Por favor complete todos los campos del pedido');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (articulosPedido.length === 0) {
      setSnackbarMessage('Por favor agregue al menos un artículo al pedido');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await dispatch(agregarPedido({
        ...orden,
        detalles: articulosPedido,
      })).unwrap();
      dispatch(clearPedido());
      setOrden({
        numeroPO: '',
        fecha: new Date().toISOString().split('T')[0],
        clienteId: '',
      });
      setSnackbarMessage('Pedido creado exitosamente');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error al crear el pedido');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Número de Orden"
              name="numeroPO"
              value={orden.numeroPO}
              onChange={handleOrdenChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha"
              name="fecha"
              value={orden.fecha}
              onChange={handleOrdenChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              label="Cliente"
              name="clienteId"
              value={orden.clienteId}
              onChange={handleClienteChange}
              required
            >
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              onClick={handleOpenDialog}
              sx={{ height: '100%' }}
            >
              Nuevo Cliente
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Artículos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Código de Artículo"
              name="codigoArticulo"
              value={articulo.codigoArticulo}
              onChange={handleArticuloChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Talla"
              name="talle"
              value={articulo.talle}
              onChange={handleArticuloChange}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              label="Cantidad"
              name="cantidad"
              value={articulo.cantidad}
              onChange={handleArticuloChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAgregarArticulo}
              disabled={loading}
            >
              Agregar Artículo
            </Button>
          </Grid>
        </Grid>

        <TableContainer sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código de Artículo</TableCell>
                <TableCell>Talla</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articulosPedido.map((articulo, index) => (
                <TableRow key={index}>
                  <TableCell>{articulo.codigoArticulo}</TableCell>
                  <TableCell>{articulo.talle}</TableCell>
                  <TableCell>{articulo.cantidad}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEliminarArticulo(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        Crear Pedido
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Nuevo Cliente</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={nuevoCliente.nombre}
            onChange={handleNuevoClienteChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Pais"
            name="pais"
            value={nuevoCliente.pais}
            onChange={handleNuevoClienteChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCrearCliente} variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormOrdenPedido; 