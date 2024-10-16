import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, partidaAprobada } from '../../redux/actions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import NavBar from '../NavBar/NavBar'
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';


export default function Cuarentena() {
  const posiciones = useSelector((state) => state.posiciones);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);
  
  
  const [partidasAPosicionar, setPartidasAPosicionar] = useState([]); 
  const cambiarAstock = (partida) => {
    setPartidasAPosicionar([...partidasAPosicionar, partida]);
  };

  return (
    <div>
      <NavBar titulo={ ` Partidas en cuarentena`}/>

      <List>
        {partidasCuarentena?.map((partida, i) => (
    <Box sx={{ padding: 2 }}>


      <Paper key={i} >
              <Typography variant="subtitle1">
              {`${partida.movimientos[0].proveedor.nombre} ${partida.movimientos[0].citemategoria} ${partida.movimientos[0].item.descripcion}`}
              </Typography>
            <Typography variant="body2">Partida: {partida.numeroPartida}</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body2">Kilos: {partida.movimientos[0].kilos}</Typography>
              <Typography variant="body2">Unidades: {partida.movimientos[0].unidades}</Typography>
            </Box>
          </Paper>
    </Box>

        ))}
      </List>
    </div>
  );
}