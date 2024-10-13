import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, limpiarProveedorSeleccionado, seleccionarProveedor, getPosicionesPorProveedor} from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import Swal from 'sweetalert2';

export default function ProveedoresSearchBar() {
    const dispatch = useDispatch();

    const proveedoresRedux = useSelector((state) => state.proveedores);

    const handleChangeProveedor = (e) => {
      dispatch(seleccionarProveedor(e.target.value))
      dispatch(getPosicionesPorProveedor(e.target.value))

    };

    const borrarEstado = () => {
      dispatch(limpiarProveedorSeleccionado())
    };
      
    return (
      <>

        <FormControl fullWidth>
          <InputLabel id="proveedor-label">Proveedores</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedoresRedux? proveedoresRedux.nombre: ""}
            onChange={handleChangeProveedor}
          >
            {proveedoresRedux?.map((prov, i) => (
              <MenuItem key={i} value={prov}>{prov.nombre}</MenuItem>
            ))}
            <Button onClick={borrarEstado} style={{ color: "gray" }}>
                Vacio
            </Button>
          </Select>
        </FormControl>
    </>
  );
}