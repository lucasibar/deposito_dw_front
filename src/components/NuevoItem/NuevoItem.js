import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { agregarNuevoItem } from '../../redux/actions';
import './NuevoItem.css';

export default function NuevoItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const proveedor = useSelector((state) => state.proveedor);
  
  const initialState = {
    codigo: "",
    proveedor,
    descripcion: "",
    tono: "",
    codigoColor: "",
    material: ""
  };
  
  const [nuevoItem, setNuevoItem] = useState(initialState);
  
  const limpiar = () => {
    setNuevoItem(initialState);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoItem(state => ({
      ...state,
      [name]: value
    }));
  };

  const agregarItem = () => {
    dispatch(agregarNuevoItem(nuevoItem));
    navigate('/deposito_dw_front/remito'); 
  };
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <Typography variant="h6" sx={{ flex: 1 }}>
              Agregar Nuevo Item
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">
              {proveedor}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <div className="formContainer">
        <TextField
          id="descripcion"
          name="descripcion"
          label="Descripción del item"
          multiline
          value={nuevoItem.descripcion}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="codigo"
          name="codigo"
          label="Código Interno"
          multiline
          value={nuevoItem.codigo}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="tono"
          name="tono"
          label="Tono"
          multiline
          value={nuevoItem.tono}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="codigoColor"
          name="codigoColor"
          label="Código de Color"
          multiline
          value={nuevoItem.codigoColor}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="material"
          name="material"
          label="Material"
          multiline
          value={nuevoItem.material}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        
        <div className='textFieldContainer'>
          <Button
            onClick={agregarItem}
            sx={{ width: '350px', mt: '30px' }}
            variant="outlined"
          >
            AGREGAR ITEM
          </Button>
          <Button
            onClick={limpiar}
            sx={{ width: '350px', mt: '30px' }}
            variant="outlined"
          >
            LIMPIAR
          </Button>
        </div>   
      </div>
    </>
  );
}