import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Paper, 
  Typography, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarArticulo } from '../model/slice';
import Swal from 'sweetalert2';

export const ListaArticulosOrdenPedido = () => {
  const dispatch = useDispatch();
  const articulos = useSelector(state => state.ordenPedido?.articulosPedido || []);

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
      dispatch(eliminarArticulo(index));
      Swal.fire(
        'Eliminado',
        'El artículo ha sido eliminado',
        'success'
      );
    }
  };

  return (
    <Paper 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {articulos.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No hay artículos agregados
        </Typography>
      ) : (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Código de Artículo</TableCell>
                <TableCell>Talla</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articulos.map((articulo, index) => (
                <TableRow key={index}>
                  <TableCell>{articulo.codigoArticulo}</TableCell>
                  <TableCell>{articulo.talla}</TableCell>
                  <TableCell align="right">{articulo.cantidad}</TableCell>
                  <TableCell align="center">
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}; 