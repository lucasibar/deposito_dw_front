import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './EntradaCaja.css'
import { agragarCaja } from '../../../redux/actions'

export default function EntradaCaja({itemsDescripciones}) {
  useEffect(()=>{
    limpiar()
  },[])


  const initialSatate= {
    kilos: 0,
    conos:0,
    codigoItem: 0,
    descripcionItem:"",
    partida:"",
    identificador: generarNumeroAleatorio(),
    pallet: 0,
    palletKGs:0
  }
  const [caja, setCaja] = useState(initialSatate);

  function handleKilos(e) {
    const cantidadKilos = e.target.value;
    setCaja(state => ({
      ...state,
      kilos: cantidadKilos
    }));
  }

  function handleConos(e) {
    const cantidadConos = e.target.value;
    setCaja(state => ({
      ...state,
      conos: cantidadConos
    }));
  }
  function handlePartida(e) {
    const partida = e.target.value;
    setCaja(state => ({
      ...state,
      partida
    }));
  }

  const handleChange = (e) => {
    setCaja(state => ({
      ...state,
      descripcionItem: e.target.value
    }));
  };

  function generarNumeroAleatorio(){
    // Genera un número aleatorio de 13 dígitos
    const numeroAleatorio = Math.floor(1000000000000 + Math.random() * 9000000000000);
    return numeroAleatorio;
  };


  const dispatch = useDispatch();
  function subirCaja(){
    dispatch(agragarCaja(caja))
    setCaja(state => ({
      ...state,
      identificador: generarNumeroAleatorio()
    }));
  
  }
  function limpiar(){
    setCaja(initialSatate)
  }
  const handlePallet = (e) => {
    setCaja(state => ({
      ...state,
      pallet: e.target.value
    }));
  };
  const handleKgsPallet = (e) => {
    setCaja(state => ({
      ...state,
      palletKGs: e.target.value
    }));
  }
  return (
    <div className='formConteiner'>
 
      <FormControl   sx={{width: '350px', marginTop:'10px'}} >
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={caja.descripcionItem}
          onChange={handleChange}
        >
        {itemsDescripciones?.map(((itemD, i)=>(
          <MenuItem  key={i} value={itemD}>{itemD}</MenuItem>
        )))}
        </Select>
      </FormControl>



          <div className='textFieldContainer'>
            <TextField
              id="outlined-multiline-flexible"
              label="Kilos por caja"
              multiline
              value={caja.kilos}
              onChange={handleKilos}
              // maxRows={4}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Conos por caja"
              multiline
              value={caja.conos}
              onChange={handleConos}
              // maxRows={4}
              sx={{marginLeft:'10px'}} 
              />
          </div>
              
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
              label="Pallet"
              multiline
              value={caja.pallet}
              onChange={handlePallet}
              // maxRows={4}
              sx={{width: '350px', marginTop:'10px'}} 
              />
            <TextField
              id="outlined-multiline-flexible"
              label="Kilos Pallet para etiqueta por pallet"
              multiline
              value={caja.palletKGs}
              onChange={handleKgsPallet}
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