import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {deleteKilosDePosicion} from '../../../redux/actions'

export default function KilosAPosicions() {
  const partidasDeEntradaAPosicion = useSelector((state) => state.partidasDeEntradaAPosicion);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPartidasEnEntrada());
  // }, [partidasEntrada]);

  const deletePartidaDePosicion = (partidaPosicion) => {
    dispatch(deleteKilosDePosicion(partidaPosicion));
  };

  return (
    <div>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={2}>
          <Typography variant="subtitle1">Partida</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Kilos</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Rack</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Fila</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">AB</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">Pasillo</Typography>
        </Grid>
      </Grid>
      <List>
        {partidasDeEntradaAPosicion?.map((partidaPosicion, i) => (
          <ListItem
            key={i}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deletePartidaDePosicion(partidaPosicion)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.partida.numeroPartida}`} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.partida.kilos}`} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.posicion2.pasillo ? '-' : partidaPosicion.posicion2.rack}`} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.posicion2.pasillo ? '-' : partidaPosicion.posicion2.fila}`} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.posicion2.pasillo ? '-' : partidaPosicion.posicion2.AB}`} />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary={`${partidaPosicion.posicion2.pasillo? partidaPosicion.posicion2.pasillo: '-'}`} />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
}