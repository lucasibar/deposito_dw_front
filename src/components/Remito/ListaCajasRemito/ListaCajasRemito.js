import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';




export default function ListaCajasRemito() {

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


  const cajas = useSelector((state) => state.cajas);



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