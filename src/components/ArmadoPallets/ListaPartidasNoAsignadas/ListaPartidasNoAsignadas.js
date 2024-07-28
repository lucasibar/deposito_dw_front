import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
// import './ListaPartidasNoAsignadas.css';

export default function ListaPartidasNoAsignadas({ pallets }) {
  return (
    <div className="list-container">
      <List>
        {pallets.map((pallet, i) => (
          <div key={i}>
            <ListItem>
              <ListItemText primary={`Partida: ${pallet.numeroPallet}`} />
              <ListItemText primary={`Fecha de ingreso: ${pallet.fecha}`} />
            </ListItem>

          </div>
        ))}
      </List>
    </div>
  );
}