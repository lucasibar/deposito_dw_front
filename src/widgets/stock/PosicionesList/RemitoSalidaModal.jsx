import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { agregarAlRemitoSalida, dataProveedoresItems } from "../../../features/remitos/model/slice";
import Swal from "sweetalert2";

export default function RemitoSalidaModal({ open, onClose, item, id }) {
  const dispatch = useDispatch();

  // Obtener la lista de proveedores desde Redux
  const proveedores = useSelector((state) => state.remitos.proveedores) || [];

  // Filtrar proveedores que tengan "cliente" en su categoría
  const proveedoresFiltrados = proveedores.filter((prov) =>
    prov.categoria?.toLowerCase().includes("cliente")
  );

  const [proveedor, setProveedor] = useState("");
  const [kilos, setKilos] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (item) {
      setKilos(item.kilos);
      setUnidades(item.unidades);
    }
  }, [item]);

  const handleProveedorChange = (e) => {
    setProveedor(e.target.value);
  };

  const handleCajasResta = (e) => {
    const value = e.target.value;
    // Calcular kilos proporcionalmente a las unidades y redondear a entero
    const kilosArestar = Math.round((item.kilos/item.unidades) * value);
    setKilos(kilosArestar);
    setUnidades(value);
  };

  const handleFechaChange = (e) => {
    const value = e.target.value;
    setFecha(value);
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

    dispatch(agregarAlRemitoSalida(
      item,
      proveedor,
      parseInt(kilos),
      parseInt(unidades),
      id,
      fecha
    ));
    onClose();
  };

  // Función para validar que todos los campos estén completos
  const isFormValid = () => {
    return proveedor && fecha;
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>Agregar a Remito de salida</DialogTitle>
      <DialogContent>
        {proveedores.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Proveedor"
              value={proveedor}
              onChange={handleProveedorChange}
              select
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
              {proveedoresFiltrados.map((prov) => (
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
            />
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              value={fecha}
              onChange={handleFechaChange}
              InputLabelProps={{ shrink: true }}
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
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          sx={{
            color: '#2ecc71',
          }}
        >
          Cerrar
        </Button>
        <Button 
          onClick={handleAjusteSubmit}
          variant="outlined"
          disabled={!isFormValid()}
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
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
} 