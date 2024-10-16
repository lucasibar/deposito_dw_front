import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, getItems, generarNuevoProveedor, subirRemito } from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ItemsSearchBar({proveedor}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems(proveedor));
  }, [proveedor]);
//----------------------------------------------------------------
  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]); 
  useEffect(() => {
    setItems(itemsRedux)
  }, [itemsRedux]);
 
  // ITEM
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
    const value = e.target.value;
      // Solo permitir números válidos
    const isNumeric = /^[0-9]*$/.test(value);
      if (isNumeric || value === "") {
      setPartida({
        ...partida,
        [field]: value === "" ? "" : parseInt(value, 10)
      });
    }
  };
  
  const limpiar = () => {
    setPartida({ kilos: "", numeroPartida: "", unidades: "" });
  };
  
  const subirPartida = () => {
    partida.item = itemSeleccionado;
    dispatch(agragarPartidaAlRemito(partida));
  };


    return (
      <>
      <div className="remito-form-container">
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
        >
          {items?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{`${itm.categoria} ${itm.descripcion}`}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>
      </div>
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
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />

        <TextField
          className="form-control"
          id="unidades"
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange('unidades')}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />
      </div>

      {/* Contenedor de los botones centrados */}
      <div className="button-container">
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR PARTIDA</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
      </div>


    </>
  );
}