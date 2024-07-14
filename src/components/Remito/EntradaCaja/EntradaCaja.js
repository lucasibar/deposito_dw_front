import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './EntradaCaja.css'
import { agragarCaja } from '../../../redux/actions'

export default function EntradaCaja({itemsDescripciones}) {
  const limpiar = (e)=>{
    setCaja(initialSatate)
  }
  
  
  
  const items = useSelector((state) => state.items);
  const [item, setItem] = useState({});
  
  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
  };




  const initialSatate= {
    kilos: 0,
    codigoItem: "",
    partida:0,
    codigoDeBarras: 0
  }
  const [caja, setCaja] = useState(initialSatate);

  function handleKilos(e) {
    const cantidadKilos = e.target.value;
    setCaja(state => ({
      ...state,
      kilos: parseInt(cantidadKilos)
    }));
  }
  function handlePartida(e) {
    const partida = e.target.value;
    setCaja(state => ({
      ...state,
      partida: parseInt(partida)
    }));
  }


  const dispatch = useDispatch();
  function subirCaja(){
    caja.codigoItem = item.id
    caja.descripcionItem = item.descripcion
    dispatch(agragarCaja(caja))
  }
  const handleKgsCodigoBarras = (e) => {
    setCaja(state => ({
      ...state,
      codigoDeBarras: parseInt(e.target.value)
    }));
  }
  return (
    <div className='formConteiner'>
 
      <FormControl   sx={{width: '350px', marginTop:'10px'}} >
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          onChange={handleChange}
        >
        
        {items?.map(((item, i)=>(
          <MenuItem  key={i} value={item}>{item.descripcion}</MenuItem>
        )))}
        <MenuItem  key={"bla"} value={"agregar item nuevo"} style={{color:"blue"}}>Agregar item nuevo</MenuItem>
        </Select>
      </FormControl>
            <TextField
              id="outlined-multiline-flexible"
              label="Kilos por caja/pallet"
              multiline
              value={caja.kilos}
              onChange={handleKilos}
              // maxRows={4}
            />
          <TextField
              id="outlined-multiline-flexible"
              label="Partida"
              multiline
              value={caja.partida}
              onChange={handlePartida}
              // maxRows={4}
              sx={{width: '350px', marginTop:'10px'}} 
              />
              <TextField
              id="outlined-multiline-flexible"
              label="Codigo de Barras"
              multiline
              value={caja.codigoDeBarras}
              onChange={handleKgsCodigoBarras}
              // maxRows={4}
              sx={{width: '350px', marginTop:'10px'}} 
              />
        <div className='textFieldContainer'>
          <Button onClick={subirCaja} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR CAJA</Button>
          <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
        </div>  
        
    </div>
  );
}