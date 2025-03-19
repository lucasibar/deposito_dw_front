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
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeProduccionTemporal } from '../../../features/produccion/model/slice';
import Swal from 'sweetalert2';

export const ListaProduccion = ({ onEdit }) => {
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
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {producciones.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No hay producciones agregadas
        </Typography>
      ) : (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Máquina</TableCell>
                <TableCell>Legajo</TableCell>
                <TableCell>Artículo</TableCell>
                <TableCell align="right">Unidades</TableCell>
                <TableCell>Lote</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {producciones.map((produccion, index) => (
                <TableRow key={index}>
                  <TableCell>{`${produccion.maquina}`}</TableCell>
                  <TableCell>{`${produccion.legajo}`}</TableCell>
                  <TableCell>{`${produccion.articulo}`}</TableCell>
                  <TableCell align="right">{produccion.unidades}</TableCell>
                  <TableCell>{produccion.numeroLoteProduccion}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}; 