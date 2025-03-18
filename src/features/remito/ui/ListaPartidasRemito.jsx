import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarPartidaDelRemito } from '../model/slice';

export const ListaPartidasRemito = () => {
  const partidasRemito = useSelector((state) => state.remito.partidasRemito);
  const dispatch = useDispatch();

  const deletePartida = (numeroPartida) => {
    dispatch(eliminarPartidaDelRemito(numeroPartida));
  };

  return (
    <div>
      <List>
        {partidasRemito?.map((partida, i) => (
          <div key={i}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => deletePartida(partida.numeroPartida)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={`${partida.item.categoria} ${partida.item.descripcion}`} />
              <ListItemText primary={`LOTE ${partida.numeroPartida}`} />
              <ListItemText primary={`${partida.kilos} kgs`} />
              <ListItemText primary={`${partida.unidades} uds`} />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
}; 