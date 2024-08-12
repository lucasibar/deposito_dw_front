import React from 'react';
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';

import {
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import { buscarStockPorPosicion } from '../../redux/actions';


export default function Posiciones() {
  const dispatch = useDispatch();

  const [rack, setRack] = React.useState('');
  const [fila, setFila] = React.useState('');
  const [AB, setAB] = React.useState('');
  const [pasillo, setPasillo] = React.useState('');
  
  
  const [resultados, setResultados] = React.useState([]);

  
  const partidasPorPosicion = useSelector((state) => state.partidasPorPosicion);


  const handleChangeRack = (event) => setRack(event.target.value);
  const handleChangeFila = (event) => setFila(event.target.value);
  const handleChangeAB = (event) => setAB(event.target.value);
  const handleChangePasillo = (event) => setPasillo(event.target.value);

  const buscarItemPorPosicion = () => {
    dispatch(buscarStockPorPosicion({
      rack:rack,
      fila:fila,
      AB: AB,
      numeroPasillo:pasillo
    }));
  };

  return (
    <Box>
      <NavBar titulo="Stock" />
      <Box className='cajaContenedor' sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <TextField
            label="Rack"
            value={rack}
            onChange={handleChangeRack}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <TextField
            label="Fila"
            value={fila}
            onChange={handleChangeFila}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <TextField
            label="A-B"
            value={AB}
            onChange={handleChangeAB}
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <TextField
            label="Pasillo"
            value={pasillo}
            onChange={handleChangePasillo}
            variant="outlined"
          />
        </FormControl>

        <Button 
          onClick={buscarItemPorPosicion} 
          variant="contained" 
          color="primary" 
          sx={{ width: '100%', marginBottom: '20px' }}
        >
          Contenido de posicion
        </Button>

        {partidasPorPosicion.length > 0 && (
          <>
            <Typography variant="h5" align="center" gutterBottom>
              Resultado de Búsqueda
            </Typography>
            <Divider sx={{ marginY: '20px' }} />

            <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número de Partida</TableCell>
                    <TableCell>Unidades</TableCell>
                    <TableCell>Kilos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partidasPorPosicion.map((partida, i) => (
                    <TableRow key={i}>
                      <TableCell>{partida.partida.numeroPartida}</TableCell>
                      <TableCell>{partida.unidades}</TableCell>
                      <TableCell>{partida.kilos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
}