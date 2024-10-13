import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProveedores, seleccionarProveedor, seleccionarFecha, seleccionarNumeroRemito, generarNuevoProveedor, subirRemito } from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import Swal from 'sweetalert2';

export default function ProveedoresSearchBar() {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProveedores());
    }, []);
//-------------------------------------------------------------------------------------

    const proveedoresRedux = useSelector((state) => state.proveedores);
    const [proveedores, setProveedores] = useState([]); 

    useEffect(() => {
        setProveedores(proveedoresRedux)
      }, [proveedoresRedux]);

    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(""); 
    const handleChangeProveedor = (e) => {
      dispatch(seleccionarProveedor(e.target.value))
      setProveedorSeleccionado(e.target.value);
    };



    //-------------------------------------------------------------------------------------

    const [numeroRemito, setNumeroRemito] = useState("");
    const handleNumeroRemitoChange = (e) => {
        // const input = e.target.value.replace(/\D/g, '');
        // const formattedInput = input.slice(0, 4) + (input.length >= 4 ? '-' : '') + input.slice(4, 12);
        dispatch(seleccionarNumeroRemito(e.target.value))
        setNumeroRemito(e.target.value);
    };

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    const [fecha, setFecha] = useState("");
    
    const handleFechaChange = (e) => {
      dispatch(seleccionarFecha(e.target.value))
      setFecha(e.target.value)    
    };

    //-------------------------------------------------------------------------------------
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
            <Button onClick={crearNuevoProveedor} style={{ color: "blue" }}>
              Agregar proveedor nuevo
            </Button>
          </Select>
        </FormControl>

        <TextField
          className="form-control"
          id="numero-remito"
          label="Número de remito"
          value={numeroRemito}
          onChange={handleNumeroRemitoChange}
        />

        <TextField
          className="form-control"
          id="fecha"
          label="Fecha"
          type="date"
          value={fecha}
          onChange={handleFechaChange}
          InputLabelProps={{ shrink: true }}
        />
      </div>

    </>
  );
}