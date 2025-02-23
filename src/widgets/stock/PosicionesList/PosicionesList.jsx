import React, { useState } from 'react';
import styles from './PosicionesList.module.css';
import { Card } from '../../../shared/ui/Card/Card';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage/ErrorMessage';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const PosicionesList = ({ posiciones, loading, error }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [expandedPositions, setExpandedPositions] = useState({});

  const handleMenuOpen = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const toggleExpand = (posicionId) => {
    setExpandedPositions(prev => ({
      ...prev,
      [posicionId]: !prev[posicionId]
    }));
  };

  const getUbicacionLabel = (posicion) => {
    if (posicion.rack && posicion.fila && posicion.AB) {
      return `Rack ${posicion.rack} - Fila ${posicion.fila} - Nivel ${posicion.AB}`;
    }
    if (posicion.pasillo) {
      return `Pasillo ${posicion.pasillo}`;
    }
    return null; // Esta posición será filtrada
  };

  const filteredPosiciones = posiciones.filter(posicion => {
    const ubicacionLabel = getUbicacionLabel(posicion);
    return ubicacionLabel !== null;
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Card className={styles.container}>
      <div className={styles.list}>
        {filteredPosiciones.map(posicion => {
          const ubicacionLabel = getUbicacionLabel(posicion);
          const isExpanded = expandedPositions[posicion.posicionId];

          return (
            <div key={posicion.posicionId} className={styles.posicionContainer}>
              <div 
                className={styles.posicionHeader}
                onClick={() => toggleExpand(posicion.posicionId)}
              >
                <h3>{ubicacionLabel}</h3>
                <IconButton size="small">
                  {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
              
              {isExpanded && (
                <div className={styles.items}>
                  {posicion.items.map(item => (
                    <div key={item.itemId} className={styles.item}>
                      <div className={styles.itemContent}>
                        <div className={styles.leftContent}>
                          <h3 className={styles.proveedorTitle}>{item.proveedor.nombre}</h3>
                          <p className={styles.categoryDesc}>
                            {item.categoria} - {item.descripcion}
                          </p>
                          <p className={styles.quantities}>
                            {item.kilos} kilos - {item.unidades} unidades
                          </p>
                        </div>
                        <div className={styles.menuContainer}>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, item.itemId)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      </div>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedItemId === item.itemId}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handleMenuClose}>Editar</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Eliminar</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Ver detalles</MenuItem>
                      </Menu>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}; 