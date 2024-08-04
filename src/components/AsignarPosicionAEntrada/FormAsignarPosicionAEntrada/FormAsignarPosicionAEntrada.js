import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';


import { agragarKilosPartidaAPosicion } from '../../../redux/actions'
import { useNavigate } from 'react-router-dom'

export default function FormAsignarPosicionAEntrada() {
  const navigate = useNavigate();

  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = React.useState([]); 

  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items]);

  const [item, setItem] = React.useState(''); 

  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
  };
  function nuevoItem(){
    navigate('/deposito_dw_front/nuevoitem')
  }

  
  
  
  
  const initialStatePartida= {
    kilos: "",
    numeroPartida:"",
    unidades:"",
    fecha:""
  }
  const [partida, setPartida] = useState(initialStatePartida);
  
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
  function handleFecha(e) {
    const fecha = e.target.value;
    setPartida(state => ({
      ...state,
      fecha: fecha
    }));
  }
  
  
  
  
  const initialStatePosicion= {
    rack:"",
    fila:"",
    AB:"",
    pasillo:""
  }
  const [posicion, setPosicion] = useState(initialStatePosicion);
  function handleRack(e) {
    const rack = e.target.value;
    setPosicion(state => ({
      ...state,
      rack: parseInt(rack) 
    }));
  }
  function handleFila(e) {
    const fila = e.target.value;
    setPosicion(state => ({
      ...state,
      fila: parseInt(fila) 
    }));
  }
  function handleAB(e) {
    const ab = e.target.value;
    setPosicion(state => ({
      ...state,
      AB: ab 
    }));
  }
  function handlePasillo(e) {
    const pasillo = e.target.value;
    setPosicion(state => ({
      ...state,
      pasillo: parseInt(pasillo) 
    }));
  }
  
  const limpiar = (e)=>{
    setPartida(initialStatePartida)
    setPosicion(initialStatePosicion)
  }
  const dispatch = useDispatch();
  async function addPartidaKilosAPosicion(){
    partida.itemDescripcion= item
    dispatch(agragarKilosPartidaAPosicion({partida, posicion1:"entrada", posicion2:posicion}))
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
              sx={{width: '350px', marginTop:'10px'}} 
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
          <TextField
            fullWidth
            margin="normal"
            label="Fecha"
            type="date"
            value={partida.fecha}
            onChange={handleFecha}
            InputLabelProps={{ shrink: true }}
            required
            sx={{width: '350px', marginTop:'10px'}} 
          />



<Divider sx={{ margin: '20px 0' }} />



      <TextField
        fullWidth
        margin="normal"
        label="Pasillo"
        type="number"
        value={posicion.pasillo}
        onChange={handlePasillo}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <TextField
        fullWidth
        margin="normal"
        label="Rack"
        type="number"
        value={posicion.rack}
        onChange={handleRack}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <TextField
        fullWidth
        margin="normal"
        label="Fila"
        type="number"
        value={posicion.fila}
        onChange={handleFila}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <FormControl fullWidth margin="normal"  sx={{width: '350px', marginTop:'10px'}} >
        <InputLabel id="position-ab-label">A/B</InputLabel>
        <Select
          labelId="position-ab-label"
          id="position-ab-select"
          value={posicion.AB}
          onChange={handleAB}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>


      
   
        <div className='textFieldContainer'>
          <Button onClick={addPartidaKilosAPosicion} sx={{ width: '350px', mt: '30px'}} variant="outlined">KILOS A POSICION</Button>
          <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
        </div>  
        
    </div>
  );
}