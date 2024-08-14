import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './DetalleRemito.css';
import { agragarPartidaAlRemito } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function DetalleRemito() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const items = useSelector((state) => state.items);

  const [item, setItem] =useState(""); 
  const [itemsDescripciones, setItemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items, setItemsDescripciones]);

  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
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
    partida.descripcionItem = item;
    dispatch(agragarPartidaAlRemito(partida));
  };

  return (
    <div className="formContainer">
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          onChange={handleChange}
        >
          {itemsDescripciones?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>
      <TextField
        id="outlined-multiline-flexible"
        label="Numero de partida"
        multiline
        value={partida.numeroPartida}
        onChange={handleInputChange('numeroPartida')}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Kilos de partida"
        multiline
        value={partida.kilos}
        onChange={handleInputChange('kilos')}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Unidades"
        multiline
        value={partida.unidades}
        onChange={handleInputChange('unidades')}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <div className='textFieldContainer'>
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px' }} variant="outlined">AGREGAR PARTIDA</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px' }} variant="outlined">LIMPIAR</Button>
      </div>
    </div>
  );
}