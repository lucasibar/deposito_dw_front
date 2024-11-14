import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, IconButton, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateIcon from '@mui/icons-material/Update';
import NavBar from '../Utils/NavBar';
import ModalPopup from './ModalPopup/ModalPopup';
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, cambiarEstadoPartida } from '../../redux/actions';
import Swal from 'sweetalert2';

export default function Cuarentena() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const [filtroNumeroPartida, setFiltroNumeroPartida] = useState('');
  const dispatch = useDispatch();

  // Cargar las partidas en cuarentena al montar el componente
  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);

  // Filtrar y ordenar partidas por número de partida y por fecha
  const partidasFiltradas = partidasCuarentena
    .filter((partida) =>
      partida.numeroPartida.toString().includes(filtroNumeroPartida)
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente

  // Abrir y cerrar el modal para la partida seleccionada
  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Cambiar estado de la partida
  const handleTogglePartidaEstado = (partida) => {
    if (partida.estado === 'cuarentena') {
      Swal.fire({
        title: '¿Llevar a revisión?',
        text: '¿Llevarás la mercadería a testear?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, llevar a revisión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-revision'));
        }
      });
    } else if (partida.estado === 'cuarentena-revision') {
      Swal.fire({
        title: 'Acción requerida',
        text: 'Aprobar o devolver a cuarentena',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Aprobar',
        denyButtonText: 'Devolver a cuarentena',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-aprobada'));
        } else if (result.isDenied) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena'));
        }
      });
    } else if (partida.estado === 'cuarentena-aprobada') {
      Swal.fire({
        title: 'Partida aprobada',
        text: '¿Volver a revisión?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, volver a revisar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-revision'));
        }
      });
    }
  };

  // Rechazar partida
  const handleRechazarPartida = (partida) => {
    Swal.fire({
      title: '¿Rechazar partida?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cambiarEstadoPartida(partida.id, 'rechazada'));
      }
    });
  };

  return (
    <>
      <NavBar titulo="Cuarentena" />
      <Box sx={{ padding: 2 }}>
        {/* Input para filtrar por número de partida */}
        <TextField
          label="Buscar por Número de Partida"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filtroNumeroPartida}
          onChange={(e) => setFiltroNumeroPartida(e.target.value)}
        />

        {/* Lista de partidas */}
        {partidasFiltradas.length > 0 ? (
          partidasFiltradas.map((partida) => (
            <Paper
              key={partida.id}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: '16px',
                position: 'relative',
              }}
            >
              <Typography variant="subtitle1">
                Part: {partida.numeroPartida} || Fecha {partida.fecha}
              </Typography>
              <Typography variant="body2" mt={2}>
                {`${partida.item.proveedor.nombre} ${partida.item.categoria} ${partida.item.descripcion}`}
              </Typography>
              <Typography variant="body2" mt={2}>
                Kilos: {partida.kilos} - Unidades: {partida.unidades}
              </Typography>
              
              {/* Botones de estado */}
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePartidaEstado(partida);
                }}
              >
                {partida.estado === 'cuarentena' ? (
                <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Mercaderia a testear
                </Typography>
                ) : partida.estado === 'cuarentena-revision' ? (
                <>
                  <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  En proceso
                </Typography>
                <UpdateIcon sx={{ color: 'orange' }} />
                </>
                ) : (
                  <DoneAllIcon sx={{ color: 'green' }} />
                )}
              </IconButton>

              {/* Botón para rechazar */}
              <IconButton
  sx={{ position: 'absolute', bottom: 8, right: 8 }}
  color="error"
  onClick={(e) => {
    e.stopPropagation();
    if (partida.estado === 'cuarentena-revision') {
      handleRechazarPartida(partida);
    } else {
      handleOpenModal(partida);
    }
  }}
>
  {partida.estado === 'cuarentena' ? (
    null
  ) : partida.estado === 'cuarentena-revision' ? (
    <>
      <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
        Rechazar
      </Typography>
      <CloseIcon />
    </>
  ) : (
    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
      Asignar posicion deposito
    </Typography>
  )}
</IconButton>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" mt={2}>
            No se encontraron ítems en estado de cuarentena.
          </Typography>
        )}

        {/* Modal para detalles de la partida */}
        {selectedPartida && (
          <ModalPopup
            open={openModal}
            handleClose={handleCloseModal}
            partida={selectedPartida}
          />
        )}
      </Box>
    </>
  );
}
