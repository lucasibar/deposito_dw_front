import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeProduccionTemporal } from '../../../features/produccion/model/slice';
import Swal from 'sweetalert2';

export const ListaProduccion = ({ onEdit, articulos, onSaveAll, loading }) => {
  const dispatch = useDispatch();
  const producciones = useSelector(state => state.produccion?.produccionesTemporales || []);

  const handleDelete = async (index) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      dispatch(removeProduccionTemporal(index));
      Swal.fire(
        'Eliminado',
        'La producción ha sido eliminada',
        'success'
      );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Producciones Agregadas
      </Typography>
      {producciones.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No hay producciones agregadas
        </Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Artículo</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Número de Lote</TableCell>
                  <TableCell>PO</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {producciones.map((produccion, index) => {
                  const articulo = articulos.find(a => a.id === produccion.articulo);
                  return (
                    <TableRow key={index}>
                      <TableCell>{articulo?.codigoArticulo} - {articulo?.talle}</TableCell>
                      <TableCell>{produccion.cantidad}</TableCell>
                      <TableCell>{produccion.numeroLoteProduccion}</TableCell>
                      <TableCell>{produccion.numeroPO}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(produccion, index)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              color="success" 
              fullWidth
              onClick={onSaveAll}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Todas las Producciones'}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}; 