import React, { useState, useEffect } from 'react';
import { Button, FormControl, TextField, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { buscarStockPorIdItem } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';

export default function Stock1() {
  const dispatch = useDispatch();
  const stockItemSeleccionado = useSelector((state) => state.stockItemSeleccionado);
  const proximaPartidaConsumo = useSelector((state) => state.proximaPartidaConsumo);

  const items = useSelector((state) => state.items);
  const [filteredItems, setFilteredItems] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 

  useEffect(() => {
    if (inputValue.trim() !== '') {
      const filtered = items.filter(item => 
        item.descripcion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [inputValue, items]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const buscarStock = () => {
    const itemSeleccionadoBuscar = items.find(itemObj => itemObj.descripcion === inputValue);
    if (itemSeleccionadoBuscar) {
      dispatch(buscarStockPorIdItem(itemSeleccionadoBuscar.id));
    } else {
      // Maneja el caso en que no se encuentra el item o el inputValue esté vacío
      console.log('Item no encontrado o input vacío');
    }
  };

  return (
    <>
      <NavBar titulo="Stock"/>
      <Box sx={{ padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Stock
        </Typography>
        <FormControl variant="outlined" fullWidth sx={{ marginBottom: '20px' }}>
          <TextField
            id="descripcion-item"
            label="Descripción Item"
            value={inputValue}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </FormControl>
        {filteredItems.length > 0 && (
          <Box sx={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px' }}>
            {filteredItems.map((itemDesc, i) => (
              <Typography 
                key={i} 
                variant="body2" 
                onClick={() => setInputValue(itemDesc.descripcion)}
                sx={{ cursor: 'pointer', padding: '8px', '&:hover': { backgroundColor: '#e0e0e0' } }}
              >
                {itemDesc.descripcion}
              </Typography>
            ))}
          </Box>
        )}
        <Button 
          onClick={buscarStock} 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ marginBottom: '20px' }}
          disabled={!inputValue.trim()}
        >
          Buscar Stock
        </Button>
        <Typography variant="h5" align="center" gutterBottom>
          Partida en consumo: {proximaPartidaConsumo}
        </Typography>
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