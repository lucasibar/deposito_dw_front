import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscarStockPorIdItem } from '../../redux/actions';

export default function Stock() {
  const dispatch = useDispatch();
  const kilosTotales = useSelector((state) => state.stockItemSeleccionado);
  
  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = React.useState([]); 

  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items]);

  const [item, setItem] = React.useState(''); 

  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
  };

  const buscarStock = () => {
    const itemSeleccionadoBuscar = items.find(itemObj => itemObj.descripcion === item);
    if (itemSeleccionadoBuscar) {
      dispatch(buscarStockPorIdItem(itemSeleccionadoBuscar.id));
    } else {
      console.log("No se encontró el item con la descripción proporcionada");
    }
  };

  return (
    <div className='cajaContenedor'>
      <FormControl sx={{ width: '350px', marginTop: '10px' }} >
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          onChange={handleChange}
        >
          {itemsDescripciones?.map((itemDesc, i) => (
            <MenuItem key={i} value={itemDesc}>{itemDesc}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={buscarStock} style={{ color: "blue" }}>Stock</Button>
      <h1>Kilos Totales {kilosTotales}</h1>
    </div>
  );
}