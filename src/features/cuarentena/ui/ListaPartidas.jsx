import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery, Paper, Typography, IconButton } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Swal from 'sweetalert2';
import { 
  fetchPartidasCuarentena, 
  cambiarEstadoPartida, 
  agregarAlRemitoSalida 
} from '../model/slice';

export const ListaPartidas = ({ onAsignarPosicion }) => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width:1024px)');
  
  const partidas = useSelector((state) => state.cuarentena.partidas);
  const filterState = useSelector((state) => state.cuarentena.filterState);
  const filterText = useSelector((state) => state.cuarentena.filterText);

  useEffect(() => {
    dispatch(fetchPartidasCuarentena());
  }, [dispatch]);

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
          dispatch(cambiarEstadoPartida({ partidaId: partida.id, nuevoEstado: 'cuarentena-revision' }));
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
          dispatch(cambiarEstadoPartida({ partidaId: partida.id, nuevoEstado: 'cuarentena-aprobada' }));
        } else if (result.isDenied) {
          dispatch(cambiarEstadoPartida({ partidaId: partida.id, nuevoEstado: 'cuarentena' }));
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
          dispatch(cambiarEstadoPartida({ partidaId: partida.id, nuevoEstado: 'cuarentena-revision' }));
        }
      });
    }
  };

  const handleRechazarPartida = (partida) => {
    const fecha = new Date().toISOString().split('T')[0];

    Swal.fire({
      title: '¿Rechazar partida?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(agregarAlRemitoSalida({
          item: partida.item,
          proveedorId: "9ee1c0f3-28ee-408e-991a-3c8cc3d8a7d7",
          kilos: partida.kilos,
          unidades: partida.unidades,
          partidaId: "34e65960-48e3-4aef-bf65-58d71511bb0b",
          fecha
        }));
        dispatch(cambiarEstadoPartida({ partidaId: partida.id, nuevoEstado: 'rechazada' }));
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
        onAsignarPosicion(partida);
      }
    });
  };

  const partidasFiltradas = partidas
    .filter((partida) => {
      const estadoMatch = filterState ? partida.estado === filterState : true;
      const filterTextLower = filterText ? filterText.toLowerCase() : '';
      const numeroPartidaMatch = String(partida.numeroPartida).toLowerCase().includes(filterTextLower);
      const descripcionMatch = partida.item?.descripcion?.toLowerCase().includes(filterTextLower);
      const categoriaMatch = partida.item?.categoria?.toLowerCase().includes(filterTextLower);
      const proveedorMatch = partida.item?.proveedor?.nombre?.toLowerCase().includes(filterTextLower);
      return estadoMatch && (numeroPartidaMatch || descripcionMatch || categoriaMatch || proveedorMatch);
    })
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <>
      {partidasFiltradas.length > 0 ? (
        partidasFiltradas.map((partida) =>
          isDesktop ? (
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
                  ? `${partida.item.proveedor?.nombre || ''} ${partida.item.categoria || ''} ${partida.item.descripcion || ''}`
                  : 'Sin información del ítem'}
              </Typography>
              <Typography variant="body2" mt={2}>
                Kilos: {partida.kilos} - Unidades: {partida.unidades}
              </Typography>
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleTogglePartidaEstado(partida)}
              >
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
                <IconButton
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                  onClick={() => handleAsignarPosicion(partida)}
                >
                  <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Asignar posición
                  </Typography>
                </IconButton>
              ) : (
                <IconButton 
                  sx={{ position: 'absolute', bottom: 8, right: 8 }}
                  onClick={() => handleRechazarPartida(partida)}
                >
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
    </>
  );
}; 