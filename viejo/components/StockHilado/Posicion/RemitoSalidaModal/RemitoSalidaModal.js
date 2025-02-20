import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, IconButton, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { agregarAlRemitoSalida, dataProveedoresItems } from "../../../../redux/actions";
import Swal from "sweetalert2";

export default function RemitoSalidaModal({ open, onClose, item, id }) {
  const dispatch = useDispatch();

  // Obtener proveedores de Redux
  useEffect(() => {
    dispatch(dataProveedoresItems());
  }, [dispatch]);

  // Obtener la lista de proveedores desde Redux
  const proveedores = useSelector((state) => state.proveedores);

  // Filtrar proveedores que tengan "cliente" en su categoría
  const proveedoresFiltrados = proveedores.filter((prov) =>
    prov.categoria?.toLowerCase().includes("cliente")
  );

  const [proveedor, setProveedor] = useState("");
  const [kilos, setKilos] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [fecha, setFecha] = useState("");

useEffect(() => {
  setKilos(item.kilos);
  setUnidades(item.unidades);
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
      parseFloat(kilos),  // Ya no necesitamos Math.round aquí
      parseInt(unidades), 
      id, 
      fecha
    )).then(() => {
      onClose();
    });
  };

  // Función para validar que todos los campos estén completos
  const isFormValid = () => {
    return proveedor && fecha;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: 400,
          margin: "auto",
          marginTop: "10%",
        }}
      >
        <Typography variant="h6">Agregar a Remito de salida</Typography>

        {/* Select de proveedores filtrados */}
        <TextField
          label="Proveedor"
          value={proveedor}
          onChange={handleProveedorChange}
          select
          fullWidth
          margin="normal"
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
        />
          <TextField
          fullWidth
          label="Fecha"
          type="date"
          value={fecha}
          onChange={handleFechaChange}
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: "20px" }}
        />
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "flex-end", 
            mt: 2,
            gap: 2 // Espacio entre botones
          }}
        >
          <IconButton 
            onClick={onClose} 
            color="error"
          >
            Cancelar
          </IconButton>
          <IconButton 
            onClick={handleAjusteSubmit} 
            color="primary"
            disabled={!isFormValid()} // Deshabilitar si el formulario no es válido
          >
            Aceptar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
