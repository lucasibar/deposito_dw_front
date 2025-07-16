import React, { useState } from 'react';
import { FaFlask, FaCheckCircle, FaExchangeAlt, FaFileExport } from 'react-icons/fa';
import { Fab, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './ItemList.module.css';
import RemitoSalidaModal from '../PosicionesList/RemitoSalidaModal';
import MovimientoModal from '../PosicionesList/MovimientoModal';
import { AdicionRapidaModal, EliminacionRapidaModal } from './AdicionRapidaModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { adicionRapida } from '../../../features/posicion/model/slice';

export const ItemList = ({ posiciones, loading, error }) => {
  const dispatch = useDispatch();
  const [openAdicionModal, setOpenAdicionModal] = useState(false);
  const [openEliminacionModal, setOpenEliminacionModal] = useState(false);
  const [openMovimientoModal, setOpenMovimientoModal] = useState(false);
  const [selectedPosicion, setSelectedPosicion] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  if (!posiciones.length) return <div>No hay posiciones disponibles</div>;

 

  const handleOpenAdicionModal = (posicion) => {
    setSelectedPosicion(posicion);
    setOpenAdicionModal(true);
  };

  const handleCloseAdicionModal = () => {
    setOpenAdicionModal(false);
    setSelectedPosicion(null);
  };

  const handleOpenEliminacionModal = (item, posicion) => {
    setSelectedItem(item);
    setSelectedPosicion(posicion);
    setOpenEliminacionModal(true);
  };

  const handleCloseEliminacionModal = () => {
    setOpenEliminacionModal(false);
    setSelectedItem(null);
    setSelectedPosicion(null);
  };

  const handleOpenMovimientoModal = (item, posicion) => {
    setSelectedItem({ ...item, posicionId: posicion.posicionId });
    setOpenMovimientoModal(true);
  };

  const handleCloseMovimientoModal = () => {
    setOpenMovimientoModal(false);
    setSelectedItem(null);
  };

  const handleAdicionRapida = async (item, posicion, tipoMovimiento) => {
    try {
      if (tipoMovimiento === 'ajusteSUMA') {
        // Para agregar, abrimos el modal de adición rápida
        setSelectedPosicion(posicion);
        setOpenAdicionModal(true);
      } else {
        // Para eliminar, abrimos el modal de eliminación rápida
        handleOpenEliminacionModal(item, posicion);
      }
    } catch (error) {
      console.error('Error en adición rápida:', error);
    }
  };

  return (
    <div className={styles.container}>
      {posiciones.map(posicion => (
        <div key={posicion.posicionId} className={styles.posicionContainer}>
          <div className={styles.posicionHeader}>
            <h3>
              {posicion.pasillo 
                ? `Pasillo ${posicion.pasillo}`
                : `Rack ${posicion.rack} - Fila ${posicion.fila} - Nivel ${posicion.AB}`
              }
            </h3>
            <Tooltip title="Agregar item rápidamente">
              <IconButton
                onClick={() => handleAdicionRapida(null, posicion, 'ajusteSUMA')}
                sx={{
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#27ae60'
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={styles.items}>
            {posicion.items.map((item, index) => (
              <div key={`${posicion.posicionId}-${item.itemId}-${index}`} className={styles.itemCard}>
                <div className={styles.mainContent}>
                  <div className={styles.titleRow}>
                    <span className={styles.description}>{item.descripcion}</span>
                  </div>
                  <div className={styles.providerRow}>
                    <span className={styles.provider}>{item.proveedor?.nombre}</span>
                    <span className={styles.partida}>Partida: {item.partida}</span>
                  </div>
                  <div className={styles.metricsRow}>
                    <span>Kilos: {item.kilos}</span>
                    <span>Unidades: {item.unidades}</span>
                  </div>
                  <div className={styles.locationInfo}>
                    <strong>Categoría:</strong> {item.categoria}
                    {item.partidaEstado && (
                      <>
                        <br />
                        <strong>Estado:</strong> {item.partidaEstado}
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.sideContent}>
                  <Tooltip title="Movimiento interno">
                    <IconButton
                      onClick={() => handleOpenMovimientoModal(item, posicion)}
                      sx={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        marginRight: 1,
                        '&:hover': {
                          backgroundColor: '#2980b9'
                        }
                      }}
                    >
                      <FaExchangeAlt />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar item rápidamente">
                    <IconButton
                      onClick={() => handleAdicionRapida(item, posicion, 'ajusteRESTA')}
                      sx={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#c0392b'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}


      <AdicionRapidaModal
        open={openAdicionModal}
        onClose={handleCloseAdicionModal}
        posicion={selectedPosicion}
      />

      <EliminacionRapidaModal
        open={openEliminacionModal}
        onClose={handleCloseEliminacionModal}
        item={selectedItem}
        posicion={selectedPosicion}
      />

      <MovimientoModal 
        open={openMovimientoModal} 
        onClose={handleCloseMovimientoModal} 
        item={selectedItem} 
        id={selectedItem?.posicionId} 
      />
    </div>
  );
}; 