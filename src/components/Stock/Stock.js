import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { buscarStockPorIdItem } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';

export default function Stock() {
  const dispatch = useDispatch();
  const stockItemSeleccionado = useSelector((state) => state.stockItemSeleccionado);
  const proximaPartidaConsumo = useSelector((state) => state.proximaPartidaConsumo);

  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = useState([]); 
  const [item, setItem] = useState(''); 

  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const buscarStock = () => {
    const itemSeleccionadoBuscar = items.find(itemObj => itemObj.descripcion === item);
    if (itemSeleccionadoBuscar) {
      dispatch(buscarStockPorIdItem(itemSeleccionadoBuscar.id));
    }
  };

  // const totalKilos = stockItemSeleccionado.reduce((total, item) => total + item.totalKilos, 0);
  // const totalKilosEntrada = stockItemSeleccionado
  //   .filter(item => item.posicion.entrada)
  //   .reduce((total, item) => total + item.totalKilos, 0);

  return (
    <>

      <NavBar titulo="Stock"/>
    <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Stock
      </Typography>
      <FormControl variant="outlined" fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="descripcion-item-label">Descripción Item</InputLabel>
        <Select
          labelId="descripcion-item-label"
          id="descripcion-item"
          value={item}
          onChange={handleChange}
          label="Descripción Item"
        >
          {itemsDescripciones?.map((itemDesc, i) => (
            <MenuItem key={i} value={itemDesc}>{itemDesc}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button 
        onClick={buscarStock} 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ marginBottom: '20px' }}
      >
        Buscar Stock
      </Button>
      <Typography variant="h5" align="center" gutterBottom>
        Partida en consumo: {proximaPartidaConsumo}
      </Typography>
      <Divider sx={{ marginY: '20px' }} />
      {/* <Typography variant="h6" align="center" gutterBottom>
        Entrada
      </Typography> */}
      {/* <Typography variant="body1" align="center" gutterBottom>
        Kilos en posición entrada: {totalKilosEntrada}
      </Typography> */}
      <Divider sx={{ marginY: '20px' }} />
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
        <TableHead>
  <TableRow>
    <TableCell align="center"><strong>Rack</strong></TableCell>
    <TableCell align="center"><strong>Fila</strong></TableCell>
    <TableCell align="center"><strong>A-B</strong></TableCell>
    <TableCell align="center"><strong>Pasillo</strong></TableCell>
    <TableCell align="center"><strong>Partida</strong></TableCell>
    <TableCell align="center"><strong>Total Kilos</strong></TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {stockItemSeleccionado.map((item, i) => (
    item.partidas.map((partida, j) => (
      <TableRow key={`${i}-${j}`}>
        <TableCell align="center">{item.posicion.rack ?? '-'}</TableCell>
        <TableCell align="center">{item.posicion.fila ?? '-'}</TableCell>
        <TableCell align="center">{item.posicion.AB ?? '-'}</TableCell>
        <TableCell align="center">{item.posicion.numeroPasillo ?? '-'}</TableCell>
        <TableCell align="center">{partida.partida.numeroPartida}</TableCell>
        <TableCell align="center">{partida.totalKilos}</TableCell>
      </TableRow>
    ))
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}