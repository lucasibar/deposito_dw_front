import React, { useState } from 'react';
import { FaFlask, FaCheckCircle, FaExchangeAlt, FaFileExport } from 'react-icons/fa';
import { Fab, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './ItemList.module.css';
import RemitoSalidaModal from '../PosicionesList/RemitoSalidaModal';
import MovimientoModal from '../PosicionesList/MovimientoModal';
import { AdicionRapidaModal } from './AdicionRapidaModal';

export const ItemList = ({ posiciones, loading, error }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [openRemitoModal, setOpenRemitoModal] = useState(false);
  const [openMovimientoModal, setOpenMovimientoModal] = useState(false);
  const [openAdicionModal, setOpenAdicionModal] = useState(false);
  const [selectedPosicion, setSelectedPosicion] = useState(null);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  if (!posiciones.length) return <div>No hay posiciones disponibles</div>;

  const handleOpenRemitoModal = (item, posicionId) => {
    setSelectedItem({ ...item, posicionId });
    setOpenRemitoModal(true);
  };

  const handleCloseRemitoModal = () => {
    setOpenRemitoModal(false);
    setSelectedItem(null);
  };

  const handleOpenMovimientoModal = (item, posicionId) => {
    setSelectedItem({ ...item, posicionId });
    setOpenMovimientoModal(true);
  };

  const handleCloseMovimientoModal = () => {
    setOpenMovimientoModal(false);
    setSelectedItem(null);
  };

  const handleOpenAdicionModal = (posicion) => {
    setSelectedPosicion(posicion);
    setOpenAdicionModal(true);
  };

  const handleCloseAdicionModal = () => {
    setOpenAdicionModal(false);
    setSelectedPosicion(null);
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
              <Fab
                size="small"
                color="primary"
                onClick={() => handleOpenAdicionModal(posicion)}
                sx={{
                  width: 36,
                  height: 36,
                  minHeight: 36,
                  backgroundColor: '#2ecc71',
                  '&:hover': {
                    backgroundColor: '#27ae60'
                  }
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </div>
          <div className={styles.items}>
            {posicion.items.map(item => (
              <div key={item.itemId} className={styles.itemCard}>
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
                  <div className={styles.actionButtons}>
                    <button 
                      className={styles.actionButton} 
                      onClick={() => handleOpenRemitoModal(item, posicion.posicionId)}
                      title="Remito de Salida"
                    >
                      <FaFileExport />
                    </button>
                    <button 
                      className={styles.actionButton} 
                      onClick={() => handleOpenMovimientoModal(item, posicion.posicionId)}
                      title="Movimiento Interno"
                    >
                      <FaExchangeAlt />
                    </button>
                  </div>
                  {posicion.estado === 'CUARENTENA' ? (
                    <FaFlask className={styles.testIcon} title="En cuarentena" />
                  ) : posicion.estado === 'CUARENTENA_REVISION' ? (
                    <FaCheckCircle className={styles.approveIcon} title="Pendiente de aprobación" />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedItem && (
        <>
          <RemitoSalidaModal 
            open={openRemitoModal} 
            onClose={handleCloseRemitoModal} 
            item={selectedItem} 
            id={selectedItem.posicionId} 
          />
          <MovimientoModal 
            open={openMovimientoModal} 
            onClose={handleCloseMovimientoModal} 
            item={selectedItem} 
            id={selectedItem?.posicionId} 
          />
        </>
      )}

      <AdicionRapidaModal
        open={openAdicionModal}
        onClose={handleCloseAdicionModal}
        posicion={selectedPosicion}
      />
    </div>
  );
}; 