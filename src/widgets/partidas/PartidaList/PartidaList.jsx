import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPartidas, selectStatus } from '../../../features/partidas/model/selectors';
import { actualizarEstadoPartida } from '../../../features/partidas/model/slice';
import { Loading } from '../../../shared/ui/Loading/Loading';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button 
} from '@mui/material';
import styles from './PartidaList.module.css';

export const PartidaList = ({ searchTerms, estado }) => {
  const dispatch = useDispatch();
  const partidas = useSelector(selectPartidas);
  const status = useSelector(selectStatus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPartida, setSelectedPartida] = useState(null);

  const handleIconClick = (partida) => {
    setSelectedPartida(partida);
    setTimeout(() => {
      setDialogOpen(true);
    }, 0);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTimeout(() => {
      setSelectedPartida(null);
    }, 100);
  };

  const handleEstadoChange = async (nuevoEstado) => {
    try {
      if (selectedPartida) {
        console.log('Partida seleccionada:', selectedPartida); // Para debug
        console.log('Nuevo estado:', nuevoEstado); // Para debug
        
        await dispatch(actualizarEstadoPartida({
          partidaId: selectedPartida.id,
          nuevoEstado: nuevoEstado.toLowerCase() // Asegurarnos que esté en minúsculas
        })).unwrap();
      }
    } catch (error) {
      console.error('Error en componente:', error);
    } finally {
      handleCloseDialog();
    }
  };

  const renderDialogContent = () => {
    if (!selectedPartida) return null;

    const estadoPartida = selectedPartida.estado.toUpperCase();

    switch (estadoPartida) {
      case 'CUARENTENA':
        return (
          <>
            <DialogTitle>Confirmar Testeo</DialogTitle>
            <DialogContent>
              <p style={{ margin: '1rem 0' }}>
                ¿Deseas comenzar el testeo de esta partida?
              </p>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseDialog}
                sx={{ color: '#424242' }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={() => handleEstadoChange('cuarentena-revision')}
                autoFocus
                sx={{ color: '#2ecc71' }}
              >
                Testear
              </Button>
            </DialogActions>
          </>
        );

      case 'CUARENTENA-REVISION':
        return (
          <>
            <DialogTitle>Finalizar Revisión</DialogTitle>
            <DialogContent>
              <p style={{ margin: '1rem 0' }}>
                ¿Cuál es el resultado de la revisión?
              </p>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => handleEstadoChange('cuarentena')}
                sx={{ color: '#424242' }}
              >
                Devolver a Cuarentena
              </Button>
              <Button 
                onClick={() => handleEstadoChange('cuarentena-aprobada')}
                sx={{ color: '#2ecc71' }}
              >
                Aprobar Mercadería
              </Button>
            </DialogActions>
          </>
        );

      default:
        return null;
    }
  };

  if (status === 'loading') {
    return <Loading />;
  }

  // Filtrar por estado y ordenar por fecha
  const partidasFiltradas = partidas
    .filter(partida => partida.estado === estado)
    .sort((a, b) => {
      const fechaA = new Date(a.fecha.split('-').reverse().join('-'));
      const fechaB = new Date(b.fecha.split('-').reverse().join('-'));
      return fechaA - fechaB; // Cambiado a orden ascendente (más antigua primero)
    });

  // Aplicar búsqueda si hay términos
  const partidasFinal = searchTerms.length > 0
    ? partidasFiltradas.filter(partida => {
        const searchableText = `${partida.numeroPartida} ${partida.descripcionItem} ${partida.proveedor}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      })
    : partidasFiltradas;

  if (partidasFinal.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        No hay partidas en este estado
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      {partidasFinal.map((partida) => (
        <div key={partida.id} className={styles.partidaItem}>
          <div className={styles.iconContainer}>
            <ChangeCircleIcon 
              className={styles.stateIcon}
              onClick={() => handleIconClick(partida)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.partidaHeader}>
              <div className={styles.headerLeft}>
                <h3>{partida.descripcionItem} Partida: {partida.numeroPartida}</h3>
                <p className={styles.descripcion}>{partida.proveedor}</p>
                <div className={styles.detalles}>
                  <p>Kilos: {partida.kilos}  </p>
                  <p>Unidades: {partida.unidades}</p>
                </div>
              </div>
              <div className={styles.headerRight}>
                <p className={styles.fecha}>{partida.fecha}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {dialogOpen && selectedPartida && (
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          {renderDialogContent()}
        </Dialog>
      )}
    </div>
  );
}; 