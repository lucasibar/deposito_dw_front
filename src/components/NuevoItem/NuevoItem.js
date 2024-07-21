import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { agregarNuevoItem } from '../../redux/actions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NuevoItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const proveedor = useSelector((state) => state.proveedor);
  
  const initialSatate = {
    codigo:"",
    proveedor,
    descripcion: "",
    tono: "",
    codigoColor: "",
    material: ""
  };
  
  const [nuevoItem, setNuevoItem] = useState(initialSatate);
  
  const limpiar = () => {
    setNuevoItem(initialSatate);
  }
  
  const handleDescripcion = (e) => {
    const descripcion = e.target.value;
    setNuevoItem(state => ({
      ...state,
      descripcion: descripcion 
    }));
  }

  const handleTono = (e) => {
    const tono = e.target.value;
    setNuevoItem(state => ({
      ...state,
      tono: tono
    }));
  }

  const handleCodigoColor = (e) => {
    const codigoColor = e.target.value;
    setNuevoItem(state => ({
      ...state,
      codigoColor: codigoColor
    }));
  }

  const handleMaterial = (e) => {
    const material = e.target.value;
    setNuevoItem(state => ({
      ...state,
      material: material
    }));
  }
  const handleCodigo = (e) => {
    const codigo = e.target.value;
    setNuevoItem(state => ({
      ...state,
      codigo
    }));
  }

  const agregarItem = () => {
    dispatch(agregarNuevoItem(nuevoItem))
    navigate('/deposito_dw_front/remito'); 
  }
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            Agregar Nuevo Item
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
        </Toolbar>
      </AppBar>

      <TextField
        id="outlined-multiline-flexible"
        label="Descripción del item"
        multiline
        value={nuevoItem.descripcion}
        onChange={handleDescripcion}
        sx={{width: '350px', marginTop:'10px'}}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Codigo Interno"
        multiline
        value={nuevoItem.codigo}
        onChange={handleCodigo}
        sx={{width: '350px', marginTop:'10px'}}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Tono"
        multiline
        value={nuevoItem.tono}
        onChange={handleTono}
        sx={{width: '350px', marginTop:'10px'}}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Código de Color"
        multiline
        value={nuevoItem.codigoColor}
        onChange={handleCodigoColor}
        sx={{width: '350px', marginTop:'10px'}}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Material"
        multiline
        value={nuevoItem.material}
        onChange={handleMaterial}
        sx={{width: '350px', marginTop:'10px'}}
      />
      
      <div className='textFieldContainer'>
        <Button onClick={agregarItem} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR ITEM</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>
      </div>   
    </div>
  );
}