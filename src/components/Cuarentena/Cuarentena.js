import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, IconButton, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import UpdateIcon from '@mui/icons-material/Update';
import ModalPopup from './ModalPopup/ModalPopup';
import BarraCuarentena from './BarraCuarentena/BarraCuarentena';
import BotonesNavegacion from '../Utils/BotonesNavegacion/BotonesNavegacion';

import { useDispatch, useSelector } from 'react-redux';
import { partidasEnCuarentena, cambiarEstadoPartida, agregarAlRemitoSalida } from '../../redux/actions';
import Swal from 'sweetalert2';

export default function Cuarentena() {
  const [filterState, setFilterState] = useState(null); // Estado para manejar el filtro dinámico
  const [filterTextState, setFilterTextState] = useState(null); // Estado para manejar el filtro dinámico
  const [openModal, setOpenModal] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);
  const dispatch = useDispatch();

  // Media query para detectar pantallas grandes (computadoras)
  const isDesktop = useMediaQuery('(min-width:1024px)');

  // Cargar las partidas en cuarentena al montar el componente
  useEffect(() => {
    dispatch(partidasEnCuarentena());
  }, [dispatch]);

  const partidasCuarentena = useSelector((state) => state.partidasCuarentena);

  // Filtrar las partidas según el estado seleccionado
  const partidasFiltradas = partidasCuarentena.filter((partida) => {
    // Filtrar por estado si filterState está definido
    const estadoMatch = filterState ? partida.estado === filterState : true;
  
    // Filtrar por texto si filterTextState está definido
    const filterText = filterTextState ? filterTextState.toLowerCase() : '';
    const numeroPartidaMatch = partida.numeroPartida.toString().toLowerCase().includes(filterText);
    const descripcionMatch = partida.item?.descripcion?.toLowerCase().includes(filterText);
    const categoriaMatch = partida.item?.categoria?.toLowerCase().includes(filterText);
    const proveedorMatch = partida.item?.proveedor?.nombre?.toLowerCase().includes(filterText);
  
    const textoMatch = numeroPartidaMatch || descripcionMatch || categoriaMatch || proveedorMatch;
  
    // Retornar true solo si ambos filtros coinciden
    return estadoMatch && textoMatch;
  })
  .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha descendente
  

  const handleOpenModal = (partida) => {
    setSelectedPartida(partida);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

   const handleRechazarPartida = (partida) => {
    const fecha = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato "AAAA-MM-DD"

    Swal.fire({
      title: '¿Rechazar partida?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          agregarAlRemitoSalida(
            partida.item,
            "9ee1c0f3-28ee-408e-991a-3c8cc3d8a7d7",
            partida.kilos,
            partida.unidades,
            "34e65960-48e3-4aef-bf65-58d71511bb0b",
            fecha 
          )
        );
        dispatch(cambiarEstadoPartida(partida.id, 'rechazada'));
      }
    });
  };

  const handleAsignarPosicion = (partida) => {
    Swal.fire({
      title: 'Asignar posición',
      text: `¿Deseas asignar una posición a la partida ${partida.numeroPartida}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
          handleOpenModal(partida);
        Swal.fire('Posición asignada', 'La posición fue asignada correctamente.', 'success');
      }
    });
  };

  return (
    <>
      <BarraCuarentena titulo="Cuarentena" setFilterState={setFilterState} setFilterTextState={setFilterTextState}   />

      <BotonesNavegacion pagina="cuarentena" />

      <Box sx={{ padding: 2 }}>
        {partidasFiltradas.length > 0 ? (
          partidasFiltradas.map((partida) =>
            isDesktop ? (
              // Listado para pantallas grandes (computadora)
              <Paper
                key={partida.id}
                sx={{
                  padding: 2,
                  marginBottom: 2,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Partida:</strong> {partida.numeroPartida}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  {partida.item?.proveedor?.nombre || '-'}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  {partida.item?.categoria || '-'} {partida.item?.descripcion || '-'}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Kilos:</strong> {partida.kilos} <strong>Unidades:</strong> {partida.unidades}
                </Typography>

                <IconButton onClick={() => handleTogglePartidaEstado(partida)}>
                  {partida.estado === 'cuarentena' ? (
                    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Testear
                    </Typography>
                  ) : partida.estado === 'cuarentena-revision' ? (
                    <UpdateIcon sx={{ color: 'orange' }} />
                  ) : (
                    <DoneAllIcon sx={{ color: 'green' }} />
                  )}
                </IconButton>
                {partida.estado === 'cuarentena-aprobada' ? (
                <IconButton onClick={() => handleAsignarPosicion(partida)}>
                  <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Asignar posición
                  </Typography>
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRechazarPartida(partida)}>
                  <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Rechazo
                  </Typography>
                </IconButton>
              )}
              </Paper>
            ) : (
              // Diseño para pantallas pequeñas (tablet y móvil)
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
                  {partida.item
                    ? `${partida.item.proveedor.nombre} ${partida.item.categoria} ${partida.item.descripcion}`
                    : null}
                </Typography>
                <Typography variant="body2" mt={2}>
                  Kilos: {partida.kilos} - Unidades: {partida.unidades}
                </Typography>
                <IconButton
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTogglePartidaEstado(partida);
                  }}
                >
                  {partida.estado === 'cuarentena' ? (
                    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Testear
                    </Typography>
                  ) : partida.estado === 'cuarentena-revision' ? (
                    <>
                      <UpdateIcon sx={{ color: 'orange' }} />
                    </>
                  ) : (
                    <DoneAllIcon sx={{ color: 'green' }} />
                  )}
                </IconButton>
                {partida.estado === 'cuarentena-aprobada' ? (
                  <IconButton
                    sx={{ position: 'absolute', bottom: 8, right: 8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAsignarPosicion(partida);
                    }}
                  >
                    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Asignar posición
                    </Typography>
                  </IconButton>
                ): (
                  <IconButton 
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                  onClick={() => handleRechazarPartida(partida)}>
                    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Rechazo
                    </Typography>
                  </IconButton>
                )}
              </Paper>
            )
          )
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
