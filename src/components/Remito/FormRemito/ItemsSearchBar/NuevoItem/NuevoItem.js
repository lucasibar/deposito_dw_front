import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { agregarNuevoItem } from '../../../../../redux/actions';
import './NuevoItem.css';
import NavBar from '../../../../Utils/NavBar';


export default function NuevoItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categorias =  ["costura", "algodon", "algodon-color", "nylon", "nylon-color", "lycra", "goma", "tarugo", "etiqueta", "bolsa", "percha", "ribbon", "caja", "cinta", "plantilla", "film", "consumibes(aceite y parafina)", "faja", "caballete"]
  
  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);

  const initialState = {
    descripcion: "",
    categoria: ""
  };
  const [nuevoItem, setNuevoItem] = useState(initialState);
  
  const handleChangeCategoria= (e) => {
    setNuevoItem({
      ...nuevoItem,
      categoria: e.target.value
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoItem(state => ({
      ...state,
      [name]: value
    }));
  };

  const agregarItem = () => {
    nuevoItem.proveedor= proveedorSeleccionado
    dispatch(agregarNuevoItem(nuevoItem));
    navigate(-1); 
  };
  
  return (
    <>
 <NavBar titulo="Agregar nuevo item" />
 <h1>{proveedorSeleccionado? `Proveedor: ${proveedorSeleccionado.nombre}`: "No seleccionaste proveedor"}</h1>
 <FormControl className="descripcion-item">
        <InputLabel id="item-label">Categoria</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={nuevoItem.categoria}
          onChange={handleChangeCategoria}
        >
          {categorias.map((cat, i) => (
            <MenuItem key={i} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>
   

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