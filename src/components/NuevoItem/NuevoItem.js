import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { agregarNuevoItem } from '../../redux/actions';
import './NuevoItem.css';
import NavBar from '../NavBar/NavBar';


export default function NuevoItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initialState = {
    codigo: "",
    descripcion: "",
    tono: "",
    color: "",
    material: ""
  };
  const [nuevoItem, setNuevoItem] = useState(initialState);
  
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
 <NavBar titulo="Agregar nuevo item" />

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
          id="color"
          name="color"
          label="Color"
          multiline
          value={nuevoItem.color}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="codigoColor"
          name="tono"
          label="Código de color proveedor"
          multiline
          value={nuevoItem.tono}
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
            onClick={()=>setNuevoItem(initialState)}
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