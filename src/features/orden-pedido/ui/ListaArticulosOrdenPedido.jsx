import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarArticulo } from '../model/slice';

const ListaArticulosOrdenPedido = () => {
  const dispatch = useDispatch();
  const { articulosPedido, loading } = useSelector((state) => state.ordenPedido);

  const handleEliminarArticulo = (index) => {
    dispatch(eliminarArticulo(index));
  };

  return (
    <Paper sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 0.5, fontSize: '1rem' }}>
        Artículos del Pedido
      </Typography>
      
      <TableContainer sx={{ 
        flex: 1,
        overflow: 'auto',
        maxHeight: 'calc(100vh - 200px)',
      }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="none" sx={{ py: 0.5 }}>Código de Artículo</TableCell>
              <TableCell padding="none" sx={{ py: 0.5 }}>Talla</TableCell>
              <TableCell padding="none" sx={{ py: 0.5 }}>Modelo</TableCell>
              <TableCell padding="none" sx={{ py: 0.5 }}>Cantidad</TableCell>
              <TableCell padding="none" sx={{ py: 0.5 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articulosPedido.map((articulo, index) => (
              <TableRow key={index}>
                <TableCell padding="none" sx={{ py: 0.5 }}>{articulo.codigoArticulo}</TableCell>
                <TableCell padding="none" sx={{ py: 0.5 }}>{articulo.talle}</TableCell> 
                <TableCell padding="none" sx={{ py: 0.5 }}>{articulo.modelo}</TableCell>
                <TableCell padding="none" sx={{ py: 0.5 }}>{articulo.cantidad}</TableCell>
                <TableCell padding="none" sx={{ py: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleEliminarArticulo(index)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ListaArticulosOrdenPedido; 