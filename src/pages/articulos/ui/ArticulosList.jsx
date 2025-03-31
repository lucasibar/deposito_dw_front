import { useState } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Button } from '@mui/material';
import { YarnCompositionDialog } from './YarnCompositionDialog';
import { useDispatch } from 'react-redux';
import { addYarnComposition } from '../api/articulosApi';

export const ArticulosList = ({ items = [], title, emptyMessage }) => {
  const [selectedArticulo, setSelectedArticulo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleAddComposition = (articulo) => {
    setSelectedArticulo(articulo);
    setDialogOpen(true);
  };

  const handleSaveComposition = async (composicion) => {
    try {
      await dispatch(addYarnComposition({
        articuloId: selectedArticulo.id,
        composicion
      })).unwrap();
    } catch (error) {
      console.error('Error al guardar la composición:', error);
    }
  };

  return (
    <>
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
              <ListItem 
                key={articulo.id}
                secondaryAction={
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddComposition(articulo)}
                  >
                    Agregar Composición
                  </Button>
                }
              >
                <ListItemText
                  primary={`Código: ${articulo.codigo}`}
                  secondary={`Largo: soquete/caña larga/ normal - Talle: ${articulo.talle}`}
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

      <YarnCompositionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveComposition}
        articulo={selectedArticulo}
      />
    </>
  );
}; 