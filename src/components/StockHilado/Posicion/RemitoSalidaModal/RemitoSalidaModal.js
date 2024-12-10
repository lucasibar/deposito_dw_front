import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, IconButton, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { agregarAlRemitoSalida, dataProveedoresItems } from "../../../../redux/actions";

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
  const [kilos, setKilos] = useState(item.kilos);
  const [unidades, setUnidades] = useState(item.unidades);
  const [fecha, setFecha] = useState("");

  const handleProveedorChange = (e) => {
    setProveedor(e.target.value);
  };

  const handleFechaChange = (e) => {
    const value = e.target.value;
    setFecha(value);
  };
  const handleAjusteSubmit = () => {
    dispatch(agregarAlRemitoSalida(item, proveedor, kilos, unidades, id, fecha));
    onClose();
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
        <Typography variant="h6">Remito de salida</Typography>

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
            <MenuItem key={prov.id} value={prov}>
              {prov.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Kilos"
          type="number"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <IconButton onClick={onClose} color="primary">
            Cerrar
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <IconButton onClick={handleAjusteSubmit} color="primary">
            Aceptar
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
}
