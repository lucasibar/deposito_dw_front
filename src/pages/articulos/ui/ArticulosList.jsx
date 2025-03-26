import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

export const ArticulosList = ({ items = [], title, emptyMessage }) => (
  <Paper 
    elevation={2} 
    sx={{ 
      p: 2,
      backgroundColor: '#ffffff', // Aseguramos que sea blanco
      minHeight: 100,
      width: '100%' // Asegura que tome todo el ancho disponible
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
    <List>
      {items.length > 0 ? (
        items.map((articulo) => (
          <ListItem key={articulo.id}>
            <ListItemText
              primary={`Código: ${articulo.codigo} - Talle: ${articulo.talle}`}
              secondary={`Unidad: ${articulo.unidad} ${
                articulo.composicionHilado 
                  ? `- Composición: ${articulo.composicionHilado.nombre}`
                  : ''
              }`}
            />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText 
            primary={emptyMessage}
            sx={{ 
              color: 'text.secondary',
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          />
        </ListItem>
      )}
    </List>
  </Paper>
); 