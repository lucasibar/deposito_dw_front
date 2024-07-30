import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function ListaPartidasNoAsignadas({ pallets }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <List>
        {pallets.map((pallet, i) => (
          <div key={i}>
            <ListItem>
              <ListItemText primary={`Partida: ${pallet.numeroPallet}} /> <ListItemText primary={Fecha de ingreso: ${pallet.fecha}`} />
            </ListItem>
            {i < pallets.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
}