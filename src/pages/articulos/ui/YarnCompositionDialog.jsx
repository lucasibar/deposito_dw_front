import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const YarnCompositionDialog = ({ open, onClose, onSave, articulo }) => {
  const [material, setMaterial] = useState('');
  const [gramos, setGramos] = useState('');
  const [composiciones, setComposiciones] = useState([]);

  const handleAdd = () => {
    if (material && gramos) {
      setComposiciones([
        ...composiciones,
        { material, gramos: Number(gramos) }
      ]);
      setMaterial('');
      setGramos('');
    }
  };

  const handleDelete = (index) => {
    setComposiciones(composiciones.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave(composiciones);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Agregar Composición de Hilados - {articulo?.codigo}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            fullWidth
            label="Gramos"
            type="number"
            value={gramos}
            onChange={(e) => setGramos(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            fullWidth
            disabled={!material || !gramos}
          >
            Agregar Hilado
          </Button>
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Composición Actual:
        </Typography>
        <List>
          {composiciones.map((comp, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${comp.material}`}
                secondary={`${comp.gramos} gramos`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={composiciones.length === 0}
        >
          Guardar Composición
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 