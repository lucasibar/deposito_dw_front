import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProveedores, selectProveedor, generarNuevoProveedor} from '../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './SelectProveedor.css';
import Swal from 'sweetalert2';


export default function SelectProveedor() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProveedores());
  }, []);

  const proveedores = useSelector((state) => state.proveedores);
  const [listaProveedores, setListaProveedores] = useState([]);
  useEffect(() => {
    setListaProveedores(proveedores)
  }, [proveedores]);
  

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState({}); 
  const handleChangeProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
    dispatch(selectProveedor(e.target.value))
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
    <div className="remito-form-container">
        <FormControl>
        <InputLabel id="proveedor-label">Proveedores</InputLabel>
        <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={handleChangeProveedor}
        >
            {listaProveedores?.map((prov, i) => (
            <MenuItem key={i} value={prov}>{prov.nombre}</MenuItem>
            ))}
            <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
            Agregar proveedor nuevo
            </Button>
        </Select>
        </FormControl>
    </div>
  );
}