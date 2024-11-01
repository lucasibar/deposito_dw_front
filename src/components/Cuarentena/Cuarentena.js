import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateIcon from '@mui/icons-material/Update';
import NavBar from '../Utils/NavBar';
import ModalPopup from './ModalPopup/ModalPopup';
import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, cambiarEstadoPartida } from '../../redux/actions';
import Swal from 'sweetalert2';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'; 

export default function Cuarentena() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const dispatch = useDispatch();

  // Cargar las partidas en cuarentena al montar el componente
  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  // Obtener las partidas desde el estado
  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);
  const [partidasRender, setPartidasRender] = useState([]);

  useEffect(() => {
    setPartidasRender(partidasCuarentena);
  }, [partidasCuarentena]);

  // Abrir y cerrar el modal para la partida seleccionada
  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para cambiar el estado de la partida según el estado actual
  const handleTogglePartidaEstado = (partida) => {
    const nuevaPartida = { ...partida }; // Copia la partida para actualizar su estado localmente

    if (partida.estado === 'cuarentena') {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Llevarás la mercadería a testear?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, llevar a revisión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-revision'));
          // Actualiza el estado local aquí
          nuevaPartida.estado = 'cuarentena-revision';
          setPartidasRender((prev) => 
            prev.map(p => p.id === partida.id ? nuevaPartida : p)
          );
        }
      });
    } else if (partida.estado === 'cuarentena-revision') {
      Swal.fire({
        title: '¿Qué deseas hacer?',
        text: "Puedes devolver la partida a cuarentena o aprobarla",
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Aprobar',
        denyButtonText: 'Devolver a cuarentena',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-aprobada'));
          nuevaPartida.estado = 'cuarentena-aprobada';
          setPartidasRender((prev) => 
            prev.map(p => p.id === partida.id ? nuevaPartida : p)
          );
        } else if (result.isDenied) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena'));
          nuevaPartida.estado = 'cuarentena'; // Actualiza el estado localmente
          setPartidasRender((prev) => 
            prev.map(p => p.id === partida.id ? nuevaPartida : p)
          );
        }
      });
    } else if (partida.estado === 'cuarentena-aprobada') {
      Swal.fire({
        title: 'Partida aprobada',
        text: "Esta partida ya ha sido aprobada. ¿Deseas volver a revisarla?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, volver a revisar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cambiarEstadoPartida(partida.id, 'cuarentena-revision'));
          nuevaPartida.estado = 'cuarentena-revision';
          setPartidasRender((prev) => 
            prev.map(p => p.id === partida.id ? nuevaPartida : p)
          );
        }
      });
    }
  };

  // Función para rechazar la partida
  const handleRechazarPartida = (partida) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres rechazar esta partida?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cambiarEstadoPartida(partida.id, 'rechazada'));
        // Actualiza el estado local aquí si es necesario
        const nuevaPartida = { ...partida, estado: 'rechazada' };
        setPartidasRender((prev) => 
          prev.map(p => p.id === partida.id ? nuevaPartida : p)
        );
      }
    });
  };

  return (
    <>
      <NavBar titulo={"Cuarentena"} />
      <Box sx={{ padding: 2 }}>
        {partidasRender?.length > 0 ? (
          partidasRender.map((partida, index) => (
            <Paper
              key={index}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: '16px',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Typography variant="subtitle1">
                {`Partida: ${partida.numeroPartida}`}
              </Typography>
              <Typography variant="body2" mt={2}>
                {`${partida.item.proveedor.nombre} ${partida.item.categoria} ${partida.item.descripcion}`}
              </Typography>
              <Typography variant="body2" mt={2}>
                Kilos: {partida.kilos} - Unidades: {partida.unidades}
              </Typography>

              {/* Botón de cambio de estado */}
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                color={
                  partida.estado === 'cuarentena-aprobada'
                    ? 'default'
                    : partida.estado === 'cuarentena-revision'
                    ? 'primary'
                    : 'secondary'
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleTogglePartidaEstado(partida);
                }}
              >
                {partida.estado === 'cuarentena' ? (
                  <CheckIcon />
                ) : partida.estado === 'cuarentena-revision' ? (
                  <UpdateIcon sx={{ color: 'orange' }} />
                ) : (
                  <DoneAllIcon sx={{ color: 'green' }} />
                )}
              </IconButton>
              <IconButton
                sx={{ position: 'absolute', bottom: 8, right: 8 }}
                color="error"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRechazarPartida(partida); // Cambia el estado a 'rechazada'
                }}
              >
                {partida.estado === 'cuarentena-aprobada' ? (
                  <KeyboardDoubleArrowRightIcon />
                ) : (
                  <CloseIcon />
                )}
              </IconButton>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" mt={2}>
            No se encontraron ítems en estado de cuarentena.
          </Typography>
        )}
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
