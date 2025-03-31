import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export const ArticulosAProducir = ({ articulos }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 2, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="body1" gutterBottom>
        Artículos a Producir
      </Typography>
      <List>
        {articulos.map((articulo) => (
          <ListItem key={articulo.id}>
            <ListItemText
              primary={`Código: ${articulo.codigo}`}
              secondary={`Modelo: ${articulo.modelo} - Talle: ${articulo.talle}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 