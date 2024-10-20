import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { seleccionarProveedor, getItems, seleccionarItem, limpiarProveedorSeleccionado } from '../../../../redux/actions';


export default function ManejadoresItems() {
  const dispatch = useDispatch();
  useEffect(() => {
    return ()=> dispatch(limpiarProveedorSeleccionado())
}, [dispatch]);


  const proveedoresRedux = useSelector((state) => state.proveedores);
  const [proveedores, setProveedores] = useState([]); 

  useEffect(() => {
      setProveedores(proveedoresRedux)
  }, [proveedoresRedux]);

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(""); 
  const handleChangeProveedor = (e) => {
    dispatch(seleccionarProveedor(e.target.value))
    setProveedorSeleccionado(e.target.value);

      if(e.target.value.id){
        dispatch(getItems(e.target.value))
      }else{
        dispatch(seleccionarItem(""))
        setItemSeleccionado("");}
  };
//----------------------------------------------------------------
  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]); 
  useEffect(() => {
    setItems(itemsRedux)
  }, [itemsRedux]);

  // ITEM
  const [itemSeleccionado, setItemSeleccionado] = useState(""); 
  const handleChangeItem = (e) => {
    dispatch(seleccionarItem(e.target.value))
    setItemSeleccionado(e.target.value);
  };


  return (
    <Box >
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={4}>
        <FormControl className="form-control">
          <InputLabel id="proveedor-label">Proveedores</InputLabel>
          <Select
            labelId="proveedor-label"
            id="proveedor"
            value={proveedorSeleccionado}
            onChange={handleChangeProveedor}
          >
            <MenuItem key={"a"} value={""}>todos</MenuItem>
            {proveedores?.map((prov, i) => (
              <MenuItem key={i} value={prov}>{prov.nombre}</MenuItem>
            ))}

          </Select>
        </FormControl>
        </Grid>



        
        {/* <Grid item xs={12} sm={12} md={8}> */}
        <Grid item xs={8} sm={8} md={8}>
          <FormControl fullWidth>
            <InputLabel>Item</InputLabel>
            <Select 
              value={itemSeleccionado} 
              onChange={handleChangeItem}
              disabled={!proveedorSeleccionado}
              >
                <MenuItem key={"a"} value={""}>todos</MenuItem>
            {items?.map((itm, i) => (
              <MenuItem key={i} value={itm}>{itm.descripcion}</MenuItem>
            ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

    </Box>
  );
}