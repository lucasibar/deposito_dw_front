import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deletePartidaDelRemito } from '../../../redux/actions'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';




export default function ListaPartidasSinPallets() {
  const partidas = useSelector((state) => state.partidas);
  const dispatch = useDispatch();



  return (
    <div>
   <h6> partidas disponibles para armado de palletas
   </h6> 
          <List >
              {partidas?.map((partida, i) => 
              <div key={i}>

                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon  />
                    </IconButton>
                  }
                >
                <h1>{partida.numeroPartida}</h1>
                  {/* <ListItemAvatar>
                    <Avatar>
                      HOLA HOLA ACA
                    </Avatar>
                  </ListItemAvatar> */}
                 
                  <ListItemText
                    primary={`${partida.idItem.descripcion}`}
                  />
                  <ListItemText
                    primary={`${partida.kilosEntrada} kgs`}
                  />
                </ListItem>
              </div>
                
              )}
            </List>
    </div>
  );
}