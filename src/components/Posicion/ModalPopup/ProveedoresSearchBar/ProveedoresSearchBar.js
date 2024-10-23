import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedores, seleccionarProveedor, seleccionarFecha, seleccionarNumeroRemito, generarNuevoProveedor, subirRemito } from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import Swal from 'sweetalert2';
import './ProveedoresSearchBar.css'

export default function ProveedoresSearchBar() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProveedores());
    }, []);
//-------------------------------------------------------------------------------------
const [proveedores, setProveedores] = useState([]); 

const proveedoresRedux = useSelector((state) => 
  state.proveedores.filter((proveedor) => proveedor.categoria === 'cliente')
);    

    useEffect(() => {
      setProveedores(proveedoresRedux)
    }, [proveedoresRedux]);


    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(""); 
    const handleChangeProveedor = (e) => {
      dispatch(seleccionarProveedor(e.target.value))
      setProveedorSeleccionado(e.target.value);
    };

const crearNuevoProveedor = () => {
    Swal.fire({
      title: "Nombre del nuevo cliente ",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Cargar cliente",
      showLoaderOnConfirm: true,
      preConfirm: async (nombreProveedor) => {
        try {
          dispatch(generarNuevoProveedor({nombre: nombreProveedor, categoria:"cliente"}))
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
      {/* Contenedor para Proveedor, Número de remito y Fecha */}
      <div className="remito-form-container">
        <FormControl className="form-control">
          <InputLabel id="proveedor-label">Proveedores</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={handleChangeProveedor}
          >
            {proveedores?.map((prov, i) => (
              <MenuItem key={i} value={prov}>{prov.nombre}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        
        <div>
        <Button
            onClick={crearNuevoProveedor}
            style={{
              alignSelf: 'flex-start', // Alinea el botón a la izquierda
              fontSize: '12px',        // Tamaño de la letra más pequeño
              textTransform: 'none',   // Evita que el texto se convierta en mayúsculas
              color: 'blue',
              marginTop: '0',
            }}
          >
              Agregar nuevo cliente
            </Button>
        </div>

      </div>

    </>
  );
}