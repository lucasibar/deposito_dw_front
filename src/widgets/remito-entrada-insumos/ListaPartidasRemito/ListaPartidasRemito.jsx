import React, { useState } from 'react';
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
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removePartidaRemitoEntrada } from '../../../features/remitos/model/slice';
import { ModalAgregarPartida } from '../ModalAgregarPartida/ModalAgregarPartida';
import Swal from 'sweetalert2';

export const ListaPartidasRemito = () => {
  const dispatch = useDispatch();
  const partidas = useSelector(state => state.remitos?.partidasRemitoEntrada || []);
  const [editingPartida, setEditingPartida] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

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
      dispatch(removePartidaRemitoEntrada(index));
      Swal.fire(
        'Eliminado',
        'La partida ha sido eliminada',
        'success'
      );
    }
  };

  const handleEdit = (partida, index) => {
    setEditingPartida(partida);
    setEditingIndex(index);
  };

  const handleSubirRemito = () => {
    console.log('Subiendo remito...');
  };

  return (
    <Paper 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {partidas.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
          No hay partidas agregadas
        </Typography>
      ) : (
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Partida</TableCell>
                <TableCell align="right">Kilos</TableCell>
                <TableCell align="right">Unidades</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partidas.map((partida, index) => (
                <TableRow key={index}>
                  <TableCell>{partida.item.descripcion} {partida.item.categoria}</TableCell>
                  <TableCell>{partida.numeroPartida}</TableCell>
                  <TableCell align="right">{partida.kilos}</TableCell>
                  <TableCell align="right">{partida.unidades}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(partida, index)}
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

      {editingPartida && (
        <ModalAgregarPartida
          open={Boolean(editingPartida)}
          onClose={() => {
            setEditingPartida(null);
            setEditingIndex(null);
          }}
          proveedorId={editingPartida.proveedorId}
          editingPartida={editingPartida}
          editingIndex={editingIndex}
        />
      )}
    </Paper>
  );
}; 