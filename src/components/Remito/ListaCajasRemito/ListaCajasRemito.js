import * as React from 'react';
import {useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';




export default function ListaCajasRemito() {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const cajas = useSelector((state) => state.cajasRemito);

  return (
    <div>
             <List dense={dense}>
              {cajas?.map((caja, i) => 
              <div key={i}>

                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      HOLA HOLA ACA
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${caja.descripcionItem}`}
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              </div>
                
              )}
            </List>
    </div>
  );
}