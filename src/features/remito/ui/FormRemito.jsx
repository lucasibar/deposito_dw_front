import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  fetchItems,
  setProveedor,
  agregarPartidaAlRemito,
  agregarPartida,
  generarNuevoProveedor
} from '../model/slice';

export const FormRemito = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estados globales
  const proveedores = useSelector((state) => state.remito.proveedores);
  const itemsRedux = useSelector((state) => state.remito.items);
  const partidasRemitoRedux = useSelector((state) => state.remito.partidasRemito);

  // Estados locales
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");
  const [itemsFiltrados, setItemsFiltrados] = useState([]);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);
  const [partida, setPartida] = useState({ kilos: "", numeroPartida: "", unidades: "" });
  
  // Nuevos estados para los diálogos
  const [openNuevoProveedorDialog, setOpenNuevoProveedorDialog] = useState(false);
  const [nuevoProveedorNombre, setNuevoProveedorNombre] = useState("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Efectos para cargar datos
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Filtrar los ítems según el proveedor seleccionado
  useEffect(() => {
    if (proveedorSeleccionado) {
      const proveedor = proveedores.find((p) => p.nombre === proveedorSeleccionado.nombre);
      if (proveedor) {
        const itemsDelProveedor = itemsRedux.filter(
          (item) => item.proveedor && item.proveedor.id === proveedor.id
        );
        setItemsFiltrados(itemsDelProveedor);
      }
    } else {
      setItemsFiltrados([]);
    }
  }, [proveedorSeleccionado, itemsRedux, proveedores]);

  // Handlers
  const handleChangeProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
    dispatch(setProveedor(e.target.value));
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "kilos" || field === "unidades") {
      if (/^\d*$/.test(value)) {
        setPartida((prev) => ({ ...prev, [field]: value }));
      }
    } else if (field === "numeroPartida") {
      setPartida((prev) => ({ ...prev, [field]: value.toString() }));
    } else {
      setPartida((prev) => ({ ...prev, [field]: value }));
    }
  };

  const agregarPartidaHandler = () => {
    if (itemSeleccionado) {
      const nuevaPartida = { 
        ...partida, 
        numeroPartida: partida.numeroPartida.toString(),
        item: itemSeleccionado 
      };
      dispatch(agregarPartidaAlRemito(nuevaPartida));
      setPartida({ kilos: "", numeroPartida: "", unidades: "" });
      setItemSeleccionado(null);
    }
  };

  const crearNuevoProveedor = () => {
    setOpenNuevoProveedorDialog(true);
  };

  const handleCloseNuevoProveedorDialog = () => {
    setOpenNuevoProveedorDialog(false);
    setNuevoProveedorNombre("");
  };

  const handleSubmitNuevoProveedor = () => {
    if (nuevoProveedorNombre.trim()) {
      dispatch(generarNuevoProveedor({nombre: nuevoProveedorNombre.trim(), categoria:"proveedor"}));
      handleCloseNuevoProveedorDialog();
    }
  };

  const subirRemito = () => {
    if (proveedorSeleccionado && numeroRemito && fecha) {
      const remito = {
        proveedorSeleccionado: proveedorSeleccionado.nombre,
        fechaSeleccionado: fecha,
        numeroRemitoSeleccionado: numeroRemito,
        partidasRemito: partidasRemitoRedux,
        tipoMovimiento: "remitoEntrada",
      };
      dispatch(agregarPartida(remito));
    } else {
      setErrorMessage("Completa todos los campos obligatorios.");
      setOpenErrorSnackbar(true);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Proveedor, número de remito y fecha */}
      <div>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <InputLabel>Proveedor</InputLabel>
          <Select value={proveedorSeleccionado} onChange={handleChangeProveedor}>
            <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
              NUEVO PROVEEDOR
            </Button>
            {proveedores.map((prov) => (
              <MenuItem key={prov.id} value={prov}>
                {prov.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Número de remito"
          value={numeroRemito}
          onChange={(e) => setNumeroRemito(e.target.value)}
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          fullWidth
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "20px" }}
        />
      </div>

      <Divider sx={{ marginY: "20px" }} />

      {/* Selección de ítems y datos de la partida */}
      <div>
        <Autocomplete
          options={proveedorSeleccionado ? [...itemsFiltrados, { id: "nuevo-item", descripcion: "NUEVO ITEM", especial: true }] : []}
          getOptionLabel={(option) =>
            option.especial ? option.descripcion : `${option.categoria} ${option.descripcion}`
          }
          value={itemSeleccionado}
          onChange={(event, newValue) => {
            if (newValue?.especial) {
              navigate('/deposito_dw_front/nuevoitem');
            } else {
              setItemSeleccionado(newValue);
            }
          }}
          renderOption={(props, option) => (
            <li
              {...props}
              style={{ color: option.especial ? "blue" : "inherit", fontWeight: option.especial ? "bold" : "normal" }}
            >
              {option.especial ? option.descripcion : `${option.categoria} ${option.descripcion}`}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="Seleccionar ítem" />}
          disabled={!proveedorSeleccionado}
          sx={{ marginBottom: "20px" }}
        />

        <TextField
          fullWidth
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange("numeroPartida")}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Kilos"
          value={partida.kilos}
          onChange={handleInputChange("kilos")}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange("unidades")}
          sx={{ marginBottom: "20px" }}
        />
      </div>

      <Divider sx={{ marginY: "20px" }} />

      {/* Botones */}
      <div>
        <Button variant="outlined" fullWidth sx={{ marginBottom: "10px" }} onClick={agregarPartidaHandler}>
          Agregar partida
        </Button>
        <Button variant="contained" fullWidth onClick={subirRemito}>
          Subir remito
        </Button>
      </div>

      {/* Diálogo para nuevo proveedor */}
      <Dialog open={openNuevoProveedorDialog} onClose={handleCloseNuevoProveedorDialog}>
        <DialogTitle>Nuevo Proveedor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del proveedor"
            type="text"
            fullWidth
            value={nuevoProveedorNombre}
            onChange={(e) => setNuevoProveedorNombre(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNuevoProveedorDialog}>Cancelar</Button>
          <Button onClick={handleSubmitNuevoProveedor} variant="contained">
            Crear Proveedor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para errores */}
      <Snackbar 
        open={openErrorSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenErrorSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setOpenErrorSnackbar(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 