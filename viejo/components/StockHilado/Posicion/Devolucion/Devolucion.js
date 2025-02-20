import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { adicionRapida, seleccionarProveedor, dataProveedoresItems } from "../../../../redux/actions";
import ItemsSearchBar from "./ItemsSearchBar/ItemsSearchBar";

export default function Devolucion({ open, onClose, idPosicion }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataProveedoresItems());
  }, [dispatch]);

  const proveedores = useSelector((state) => state.proveedores);

  const [proveedor, setProveedor] = useState("");
  const [item, setItem] = useState("");
  const [kilos, setKilos] = useState("");
  const [unidades, setUnidades] = useState("");
  const [partida, setPartida] = useState("");

  const handleSubmit = () => {
    dispatch(
      adicionRapida({
        proveedor,
        tipoMovimiento: "ajusteSUMA",
        item,
        kilos,
        unidades,
        partida,
        posicion: idPosicion,
      })
    );
    onClose();
  };

  const handleChangeProveedor = (e) => {
    dispatch(seleccionarProveedor(e.target.value));
    setProveedor(e.target.value);
  };

  const inputStyle = { fullWidth: true, margin: "normal" }; // Estilo uniforme para inputs

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
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" mb={2}>
        Devolucion
        </Typography>

        <TextField
          label="Proveedor"
          value={proveedor}
          onChange={handleChangeProveedor}
          select
          {...inputStyle}
        >
          {proveedores.map((prov) => (
            <MenuItem key={prov.id} value={prov}>
              {prov.nombre}
            </MenuItem>
          ))}
        </TextField>

        <ItemsSearchBar proveedor={proveedor} setItem={setItem} inputStyle={inputStyle} />

        <TextField
          label="Kilos"
          type="number"
          value={kilos}
          onChange={(e) => setKilos(e.target.value)}
          {...inputStyle}
        />

        <TextField
          label="Unidades"
          type="number"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
          {...inputStyle}
        />

        <TextField
          label="Número de Partida"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
          {...inputStyle}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
