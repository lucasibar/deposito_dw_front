import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addYarnComposition, updateOrCreateComposiciones, fetchArticulos } from '../api/articulosApi';

export const ArticulosConComposicionList = ({ items = [], title, emptyMessage }) => {
  const [expandedArticulo, setExpandedArticulo] = useState(null);
  const [editingComposicion, setEditingComposicion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newHilado, setNewHilado] = useState({ nombreHilado: '', cantidadHilado: '' });
  const dispatch = useDispatch();

  const handleAccordionChange = (articuloId) => (event, isExpanded) => {
    setExpandedArticulo(isExpanded ? articuloId : null);
  };

  const handleEditQuantity = (articuloId, hiladoId, newQuantity) => {
    setEditingComposicion(prev => {
      if (!prev) return null;
      return {
        ...prev,
        composicionHilado: prev.composicionHilado.map(hilado =>
          hilado.id === hiladoId
            ? { ...hilado, cantidadHilado: newQuantity }
            : hilado
        )
      };
    });
  };

  const handleDeleteHilado = (articuloId, hiladoId) => {
    setEditingComposicion(prev => {
      if (!prev) return null;
      return {
        ...prev,
        composicionHilado: prev.composicionHilado.filter(hilado => hilado.id !== hiladoId)
      };
    });
  };

  const handleAddHilado = () => {
    setOpenDialog(true);
  };

  const handleSaveNewHilado = () => {
    if (!newHilado.nombreHilado || !newHilado.cantidadHilado) return;

    setEditingComposicion(prev => {
      if (!prev) return null;
      return {
        ...prev,
        composicionHilado: [
          ...prev.composicionHilado,
          {
            id: null, // El servidor generará el ID
            nombreHilado: newHilado.nombreHilado,
            cantidadHilado: newHilado.cantidadHilado,
            createdAt: new Date().toISOString(),
            isNew: true // Marcamos que es un nuevo hilado
          }
        ]
      };
    });

    setNewHilado({ nombreHilado: '', cantidadHilado: '' });
    setOpenDialog(false);
  };

  const handleSaveChanges = async (articulo) => {
    try {
      // Encontrar las composiciones que han sido modificadas
      const composicionesModificadas = articulo.composicionHilado.filter((hiladoEditado) => {
        const hiladoOriginal = items.find(a => a.id === articulo.id)
          ?.composicionHilado.find(h => h.id === hiladoEditado.id);
        
        // Si es un nuevo hilado (marcado con isNew)
        if (hiladoEditado.isNew) return true;
        
        // Si no existe en el original, es nuevo
        if (!hiladoOriginal) return true;
        
        // Si existe, comparar si hay cambios
        return hiladoEditado.cantidadHilado !== hiladoOriginal.cantidadHilado;
      });

      // Preparar las composiciones para enviar al servidor
      const composicionesParaEnviar = composicionesModificadas.map(hilado => ({
        id: hilado.id, // Si es null, el servidor lo creará como nuevo
        nombreHilado: hilado.nombreHilado,
        cantidadHilado: hilado.cantidadHilado,
        articulo: { id: articulo.id }
      }));

      // Enviar las composiciones al servidor
      await dispatch(updateOrCreateComposiciones(composicionesParaEnviar)).unwrap();
      
      // Actualizar la lista de artículos
      await dispatch(fetchArticulos()).unwrap();
      
      setEditingComposicion(null);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, backgroundColor: '#ffffff', width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      {items.length > 0 ? (
        items.map((articulo) => (
          <Accordion
            key={articulo.id}
            expanded={expandedArticulo === articulo.id}
            onChange={handleAccordionChange(articulo.id)}
            sx={{ mb: 1 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <Typography>Código: {articulo.codigo}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Modelo: {articulo.modelo}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Talle: {articulo.talle}</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {(editingComposicion?.id === articulo.id ? editingComposicion.composicionHilado : articulo.composicionHilado).map((hilado) => (
                  <ListItem key={hilado.id}>
                    <ListItemText
                      primary={hilado.nombreHilado}
                      secondary={
                        editingComposicion?.id === articulo.id ? (
                          <TextField
                            size="small"
                            type="number"
                            value={hilado.cantidadHilado}
                            onChange={(e) => handleEditQuantity(articulo.id, hilado.id, e.target.value)}
                            sx={{ width: '100px' }}
                          />
                        ) : (
                          `Cantidad: ${hilado.cantidadHilado}`
                        )
                      }
                    />
                    {editingComposicion?.id === articulo.id && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteHilado(articulo.id, hilado.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
              {editingComposicion?.id === articulo.id ? (
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddHilado}
                    sx={{ mr: 'auto' }}
                  >
                    Agregar Hilado
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveChanges(editingComposicion)}
                  >
                    Guardar Cambios
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setEditingComposicion(null)}
                  >
                    Cancelar
                  </Button>
                </Box>
              ) : (
                <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditingComposicion(articulo)}
                  >
                    Editar Composición
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
          {emptyMessage}
        </Typography>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Agregar Nuevo Hilado</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre del Hilado"
              value={newHilado.nombreHilado}
              onChange={(e) => setNewHilado(prev => ({ ...prev, nombreHilado: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Cantidad (gramos)"
              type="number"
              value={newHilado.cantidadHilado}
              onChange={(e) => setNewHilado(prev => ({ ...prev, cantidadHilado: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveNewHilado} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}; 