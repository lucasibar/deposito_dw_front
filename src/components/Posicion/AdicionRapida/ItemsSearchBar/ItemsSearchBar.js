import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, getItems, generarNuevoProveedor, subirRemito } from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ItemsSearchBar({proveedor, setItem}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    proveedor && dispatch(getItems(proveedor));
  }, [proveedor]);
//----------------------------------------------------------------
  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]); 
  useEffect(() => {
    setItems(itemsRedux)
  }, [itemsRedux]);
 
  // ITEM
  const [itemSeleccionado, setItemSeleccionado] = useState(""); 
  const handleChangeItem = (e) => {
    setItemSeleccionado(e.target.value);
    setItem(e.target.value);
  };
  
    return (
      <>
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
          disabled={!proveedor}
        >
          {items?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{`${itm.categoria} ${itm.descripcion}`}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>



    </>
  );
}