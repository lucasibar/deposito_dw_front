import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './PartidasRemito.css'
import { agragarPartidaAlRemito } from '../../../redux/actions'
import { useNavigate } from 'react-router-dom'

export default function PartidasRemito({itemsDescripciones}) {
  const navigate = useNavigate();

  const [item, setItem] = useState({});
  
  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
  };

  function nuevoItem(){
    navigate('/deposito_dw_front/nuevoitem')
  }

  
  
  
  
  const initialSatate= {
    kilos: 0,
    numeroPartida:0,
    unidades: 0 
  }
  const [partida, setPartida] = useState(initialSatate);
  const limpiar = (e)=>{
    setPartida(initialSatate)
  }
  
  function handleUnidades(e) {
    const unidades = e.target.value;
    setPartida(state => ({
      ...state,
      unidades: parseInt(unidades) 
    }));
  }
  function handleKilos(e) {
    const cantidadKilos = e.target.value;
    setPartida(state => ({
      ...state,
      kilos: parseInt(cantidadKilos)
    }));
  }
  function handlePartida(e) {
    const partida = e.target.value;
    setPartida(state => ({
      ...state,
      numeroPartida: parseInt(partida)
    }));
  }






  const dispatch = useDispatch();
  async function subirPartida(){
    partida.descripcionItem= item
    dispatch(agragarPartidaAlRemito(partida))
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
        
        {itemsDescripciones?.map(((item, i)=>(
          <MenuItem  key={i} value={item}>{item}</MenuItem>
        )))}
        <Button onClick={nuevoItem} key={"bla"} value={"agregar item nuevo"} style={{color:"blue"}}>Agregar item nuevo</Button>
        </Select>
      </FormControl>
          <TextField
              id="outlined-multiline-flexible"
              label="Numero de partida"
              multiline
              value={partida.numeroPartida}
              onChange={handlePartida}
              // maxRows={4}
              sx={{width: '350px', marginTop:'10px'}} 
              />
          <TextField
              id="outlined-multiline-flexible"
              label="Kilos"
              multiline
              value={partida.kilos}
              onChange={handleKilos}
              // maxRows={4}
            />
          <TextField
              id="outlined-multiline-flexible"
              label="Unidades"
              multiline
              value={partida.unidades}
              onChange={handleUnidades}
              // maxRows={4}
              sx={{width: '350px', marginTop:'10px'}} 
              />
   
        <div className='textFieldContainer'>
          <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR PARTIDA</Button>
          <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
        </div>  
        
    </div>
  );
}