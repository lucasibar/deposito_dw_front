import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { agregarNuevoItem, generarNuevoProveedor } from '../../redux/actions';
import './NuevoItem.css';
import NavBar from '../NavBar/NavBar';
import Swal from 'sweetalert2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function NuevoItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    descripcion: "",
    codigoInterno: "",
    codigoProveedor: "",
    material: "",
    proveedor: ""
  };
  const [nuevoItem, setNuevoItem] = useState(initialState);
  
  const proveedores = useSelector((state) => state.proveedores);
  const handleChangeProveedor = (e) => {
    setNuevoItem(state => ({
      ...state,
      proveedor: e.target.value
    }));
  };

  const handleChangeMaterial = (e) => {
    setNuevoItem(state => ({
      ...state,
      material: e.target.value
    }));
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
  


  const crearNuevoProveedor = () => {
    Swal.fire({
      title: "Nombre del nuevo proveedor",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Cargar proveedor",
      showLoaderOnConfirm: true,
      preConfirm: async (nombreProveedor) => {
        try {
          dispatch(generarNuevoProveedor(nombreProveedor))
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    };
  return (
    <>

  


      <NavBar titulo="Agregar nuevo item" />

      <div className="formContainer">

      <FormControl className="form-control">
        <InputLabel id="proveedor-label">Proveedores</InputLabel>
        <Select
          labelId="proveedor-label"
          id="proveedor"
          value={nuevoItem.proveedor}
          onChange={handleChangeProveedor}
        >
          {proveedores?.map((prov, i) => (
            <MenuItem key={i} value={prov}>{prov}</MenuItem>
          ))}
          <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
            Agregar proveedor nuevo
          </Button>
        </Select>
      </FormControl>



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
          value={nuevoItem.codigoInterno}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
        <TextField
          id="codigoProveedor"
          name="codigoProveedor"
          label="Codigo Proveedor"
          multiline
          value={nuevoItem.codigoProveedor}
          onChange={handleChange}
          sx={{ width: '350px', marginTop: '10px' }}
        />
      
        <FormControl className="form-control">
        <InputLabel id="material-label">Material</InputLabel>
        <Select
          labelId="material-label"
          id="material"
          value={nuevoItem.material}
          onChange={handleChangeMaterial}
        >
            <MenuItem value={"costura"}>{"costura"}</MenuItem>
            <MenuItem value={"algodon"}>{"algodon"}</MenuItem>
            <MenuItem value={"nylon"}>{"nylon"}</MenuItem>
            <MenuItem value={"laicra"}>{"laicra"}</MenuItem>
            <MenuItem value={"goma"}>{"goma"}</MenuItem>

     
        </Select>
      </FormControl>






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