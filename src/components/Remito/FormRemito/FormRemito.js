import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, dataRemitoLoad } from '../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './FormRemito.css'; // Importamos la hoja de estilos

export default function FormRemito() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataRemitoLoad());
  }, [dispatch]);

  // PROVEEDOR
  const proveedores = useSelector((state) => state.proveedores);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(""); 
  const handleChangeProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
  };
  const [numeroRemito, setNumeroRemito] = useState("");
  const [fecha, setFecha] = useState("");

  const handleNumeroRemitoChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
    setNumeroRemito(formattedInput);
  };

  // ITEM
  const items = useSelector((state) => state.items);
  const [itemSeleccionado, setItemSeleccionado] = useState(""); 
  const handleChangeItem = (e) => {
    setItemSeleccionado(e.target.value);
  };

  const [partida, setPartida] = useState({
    kilos: "",
    numeroPartida: "",
    unidades: "",
  });

  const handleInputChange = (field) => (e) => {
    setPartida({ ...partida, [field]: parseInt(e.target.value, 10) });
  };

  const limpiar = () => {
    setPartida({ kilos: "", numeroPartida: "", unidades: "" });
  };

  const subirPartida = () => {
    partida.descripcionItem = itemSeleccionado;
    dispatch(agragarPartidaAlRemito(partida));
  };

  return (
    <>
      {/* Contenedor para Proveedor, Número de remito y Fecha */}
      <div className="remito-form-container">
        <FormControl className="form-control">
          <InputLabel id="proveedor-label">Proveedores</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={handleChangeProveedor}
          >
            {proveedores?.map((prov, i) => (
              <MenuItem key={i} value={prov}>{prov}</MenuItem>
            ))}
            <Button onClick={() => navigate('/deposito_dw_front/nuevoproveedor')} style={{ color: "blue" }}>
              Agregar proveedor nuevo
            </Button>
          </Select>
        </FormControl>

        <TextField
          className="form-control"
          id="numero-remito"
          label="Número de remito"
          value={numeroRemito}
          onChange={handleNumeroRemitoChange}
        />

        <TextField
          className="form-control"
          id="fecha"
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </div>
      <Divider sx={{ marginY: '20px' }} />

      {/* Campo de Descripción de Item en una fila aparte */}
      
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
        >
          {items?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>

      {/* Contenedor para Número de Partida, Kilos y Unidades */}
      <div className="partida-form-container">
        <TextField
          className="form-control"
          id="numero-partida"
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange('numeroPartida')}
        />

        <TextField
          className="form-control"
          id="kilos"
          label="Kilos de partida"
          value={partida.kilos}
          onChange={handleInputChange('kilos')}
        />

        <TextField
          className="form-control"
          id="unidades"
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange('unidades')}
        />
      </div>

      {/* Contenedor de los botones centrados */}
      <div className="button-container">
        <Button onClick={subirPartida} variant="outlined">AGREGAR PARTIDA</Button>
        <Button onClick={limpiar} variant="outlined">LIMPIAR</Button>
      </div>


    </>
  );
}