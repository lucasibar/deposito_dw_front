import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, IconButton } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { fetchItemsPosicion } from '../model/slice';

export const ListaItems = ({ posicionId, onMovimiento, onAjuste, onRemito }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.posicionDetalle.items);
  const loading = useSelector((state) => state.posicionDetalle.loading);

  useEffect(() => {
    dispatch(fetchItemsPosicion(posicionId));
  }, [dispatch, posicionId]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <>
      {items.length > 0 ? (
        items.map((item) => (
          item.kilos > 0 && item.unidades > 0 ? (
            <Paper
              key={item.id}
              sx={{ 
                padding: 2, 
                marginBottom: 2, 
                borderRadius: '16px', 
                cursor: 'pointer', 
                position: 'relative' 
              }}
            >
              <Typography variant="subtitle1">
                {`Partida: ${item.partida}`}
              </Typography>
              <Typography variant="body2" mt={2}>
                {item.proveedor.nombre} {item.categoria} {item.descripcion}
              </Typography>
              
              <Typography variant="body2" mt={2}>
                Kilos: 
                <span 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={() => onAjuste(item)}
                >
                  {item.kilos}
                </span> 
                - Unidades: 
                <span 
                  style={{ color: 'blue', cursor: 'pointer' }} 
                  onClick={() => onAjuste(item)}
                >
                  {item.unidades}
                </span>
              </Typography>

              <IconButton 
                sx={{ position: 'absolute', bottom: 8, right: 8 }} 
                color="error" 
                onClick={() => onMovimiento(item)}
              >
                <KeyboardDoubleArrowRightIcon />
              </IconButton>

              <IconButton 
                sx={{ position: 'absolute', top: 8, right: 8 }} 
                color="primary" 
                onClick={() => onRemito(item)}
              >
                <Typography sx={{ color: 'blue', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Remito Salida
                </Typography>
              </IconButton>
            </Paper>
          ) : null
        ))
      ) : (
        <Typography variant="body2" mt={2}>
          No se encontraron ítems para esta posición.
        </Typography>
      )}
    </>
  );
}; 