import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, partidaAprobada } from '../../redux/actions';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import NavBar from '../NavBar/NavBar';
import { Paper, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import Swal from 'sweetalert2';

export default function Cuarentena() {
  const posiciones = useSelector((state) => state.posiciones);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);
  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);
  
  const [partidasSeleccionadas, setPartidasSeleccionadas] = useState([]);
  const [posicionSeleccionada, setPosicionSeleccionada] = useState(null);

  const seleccionarPartida = (partida) => {
    if (partidasSeleccionadas.includes(partida)) {
      setPartidasSeleccionadas(partidasSeleccionadas.filter(p => p !== partida));
    } else {
      setPartidasSeleccionadas([...partidasSeleccionadas, partida]);
    }
  };

  const asignarAPosicion = (posicion) => {
    if (partidasSeleccionadas.length > 0) {
      // Aquí puedes manejar la lógica de asignación como desees
      console.log(`Asignando las siguientes partidas a la posición ${posicion}:`, partidasSeleccionadas);
      Swal.fire({
        title: "Mera",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
      // Limpiar las partidas seleccionadas después de la asignación
      setPartidasSeleccionadas([]);
      setPosicionSeleccionada(posicion);
    }
  };

  const posicionesVacias = posiciones?.filter(posicion => posicion.item.length===0);

  return (
    <div>
      <NavBar titulo={`Partidas en cuarentena`} />

      <Typography variant="h6" gutterBottom>
        Selecciona partidas para asignar a una posición:
      </Typography>

      <List>
        {partidasCuarentena?.map((partida, i) => (
          <Box sx={{ padding: 2 }} key={i}>
            <Paper 
              onClick={() => seleccionarPartida(partida)} // Al hacer clic, selecciona o deselecciona la partida
              sx={{ 
                cursor: 'pointer', 
                backgroundColor: partidasSeleccionadas.includes(partida) ? '#f0f0f0' : '#fff' // Cambia el color si está seleccionada
              }} 
            >
              <Typography variant="subtitle1">
                {`${partida.movimientos[0].proveedor.nombre} ${partida.movimientos[0].item.categoria} ${partida.movimientos[0].item.descripcion}`}
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

      {/* Mostrar las posiciones para asignar las partidas seleccionadas */}
      <Typography variant="h6" gutterBottom>
        Selecciona una posición vacía:
      </Typography>
      <Box display="flex" flexWrap="wrap">
  {posicionesVacias
    ?.sort((a, b) => {
      // Primero comparamos por rack
      if (a.rack !== b.rack) {
        return a.rack - b.rack; // Ordenar por rack de menor a mayor
      }
      // Si los racks son iguales, comparamos por fila
      return a.fila - b.fila; // Ordenar por fila de menor a mayor
    })
    .map((posicion, i) => (
      !posicion.entrada ? (
        <Paper 
          key={i} 
          onClick={() => asignarAPosicion(posicion)}
          sx={{ 
            cursor: 'pointer', 
            padding: 2, 
            margin: 2, 
            width: 200, 
            textAlign: 'center', 
            backgroundColor: posicionSeleccionada === posicion ? '#f0f0f0' : '#fff' 
          }}
        >
          {/* Si tiene numeroPasillo muestra el pasillo, de lo contrario muestra rack, fila, AB */}
          {posicion.numeroPasillo ? (
            <Typography variant="subtitle1">{`Pasillo: ${posicion.numeroPasillo}`}</Typography>
          ) : (
            <Typography variant="subtitle1">{`${posicion.rack}-${posicion.fila}-${posicion.AB}`}</Typography>
          )}
        </Paper>
      ) : null
  ))}
</Box>
      {/* Botón para confirmar la asignación (opcional)
      {partidasSeleccionadas.length > 0 && posicionSeleccionada && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => asignarAPosicion(posicionSeleccionada)}
        >
          Asignar partidas seleccionadas
        </Button>
      )} */}
    </div>
  );
}