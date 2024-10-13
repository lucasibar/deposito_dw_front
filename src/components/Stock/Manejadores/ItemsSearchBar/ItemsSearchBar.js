import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, getItems, generarNuevoProveedor, subirRemito } from '../../../../redux/actions';
import { InputLabel, MenuItem, FormControl, Select, Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ItemsSearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsProveedor = useSelector((state) => state.itemsProveedor);
  useEffect(() => {
    dispatch(getItems(itemsProveedor));  
  }, [itemsProveedor]);
  
//----------------------------------------------------------------
  const [items, setItems] = useState([]); 
  useEffect(() => {
    setItems(itemsProveedor)
  }, [itemsProveedor]);
 
  // ITEM
  const [itemSeleccionado, setItemSeleccionado] = useState(""); 
  const handleChangeItem = (e) => {
    setItemSeleccionado(e.target.value);
  };
  

    return (
      <>
      <div className="remito-form-container">
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
        >
          {items?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{`${itm.categoria} ${itm.descripcion}`}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      

    </>
  );
}