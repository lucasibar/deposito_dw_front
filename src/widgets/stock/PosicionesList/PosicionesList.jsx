import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaFlask, FaCheckCircle, FaExchangeAlt, FaFileExport } from 'react-icons/fa';
import styles from './PosicionesList.module.css';
import RemitoSalidaModal from './RemitoSalidaModal';
import MovimientoModal from './MovimientoModal';
import { dataProveedoresItems } from '../../../features/remitos/model/slice';

export const PosicionesList = ({ posiciones, loading, error }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openRemitoModal, setOpenRemitoModal] = useState(false);
  const [openMovimientoModal, setOpenMovimientoModal] = useState(false);

  // Cargar proveedores una sola vez al montar el componente
  useEffect(() => {
    dispatch(dataProveedoresItems());
  }, [dispatch]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // Filtrar solo las posiciones con entrada false
  const posicionesFiltradas = posiciones.filter(posicion => posicion.entrada === false);
  
  if (!posicionesFiltradas.length) return <div>No hay posiciones disponibles</div>;

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

  return (
    <div className={styles.listContainer}>
      {posicionesFiltradas.map((posicion) => 
        posicion.items.map((item, index) => (
          <div key={`${posicion.posicionId}-${item.itemId}-${index}`} className={styles.itemCard}>
            <div className={styles.mainContent}>
              <div className={styles.titleRow}>
                <span className={styles.description}>
                  {`${item.descripcion} ${item.categoria || ''} ${item.proveedor?.nombre || ''}`}
                </span>
              </div>

              <div className={styles.metricsRow}>
                <span>{item.kilos?.toLocaleString('es-AR')} kilos</span>
                <span>{item.unidades?.toLocaleString('es-AR')} unidades</span>
                <span className={styles.partida}>Partida: {item.partida}</span>
              </div>
              
              <span className={styles.locationInfo}>
                Fila <strong>{posicion.fila||'-'}</strong>  Rack <strong>{posicion.rack||'-'}</strong>  Nivel <strong>{posicion.AB||'-'}</strong>  Pasillo <strong>{posicion.pasillo||'-'}</strong>
              </span>
            </div>

            <div className={styles.sideContent}>
              <span className={styles.date}>{posicion.fecha}</span>
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
        ))
      )}

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
    </div>
  );
}; 