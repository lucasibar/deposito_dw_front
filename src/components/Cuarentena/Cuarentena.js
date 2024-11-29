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
import { partidasEnCuarentena, cambiarEstadoPartida } from '../../redux/actions';
import Swal from 'sweetalert2';

export default function Cuarentena() {
  const [filterState, setFilterState] = useState(null); // Estado para manejar el filtro dinámico
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
  const partidasFiltradas = partidasCuarentena
    .filter((partida) => {
      if (!filterState) return true; // Si no hay filtro, mostrar todas
      return partida.estado === filterState;
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
    // Mantener lógica de cambiar estado aquí
  };

  const handleRechazarPartida = (partida) => {
    // Mantener lógica de rechazar partida aquí
  };

  return (
    <>
      <BarraCuarentena titulo="Cuarentena" setFilterState={setFilterState} />

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
                  <strong>Proveedor:</strong> {partida.item?.proveedor?.nombre || '-'}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Categoría:</strong> {partida.item?.categoria || '-'}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Descripción:</strong> {partida.item?.descripcion || '-'}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Kilos:</strong> {partida.kilos}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Unidades:</strong> {partida.unidades}
                </Typography>
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                  <strong>Estado:</strong> {partida.estado}
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

                {/* Botones existentes */}
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
                  {partida.estado === 'cuarentena' ? null : partida.estado === 'cuarentena-revision' ? (
                    <>
                      <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                        Rechazar
                      </Typography>
                      <CloseIcon />
                    </>
                  ) : (
                    <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                      Asignar posición
                    </Typography>
                  )}
                </IconButton>
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
