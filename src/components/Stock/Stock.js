import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscarStockPorIdItem } from '../../redux/actions';

export default function Stock() {
  const dispatch = useDispatch();
  const stockItemSeleccionado = useSelector((state) => state.stockItemSeleccionado);

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
    }
  };

  const totalKilos = stockItemSeleccionado.reduce((total, item) => total + item.totalKilos, 0);
  const totalKilosEntrada = stockItemSeleccionado
    .filter(item => item.posicion.entrada)
    .reduce((total, item) => total + item.totalKilos, 0);

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
      <h1>Kilos Totales: {totalKilos}</h1>
      <hr />
      <h2>Entrada</h2>
      <p>Kilos en poscicion entrada: {totalKilosEntrada}</p>
      <hr />
      <table style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Rack</th>
            <th>Fila</th>
            <th>A-B</th>
            <th>Pasillo</th>
            <th>Total Kilos</th>
          </tr>
        </thead>
        <tbody>
          {stockItemSeleccionado.map((item, i) => (
            <tr key={i}>
              <td>{item.posicion.rack ?? '-'}</td>
              <td>{item.posicion.fila ?? '-'}</td>
              <td>{item.posicion.AB ?? '-'}</td>
              <td>{item.posicion.numeroPasillo ?? '-'}</td>
              <td>{item.totalKilos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}