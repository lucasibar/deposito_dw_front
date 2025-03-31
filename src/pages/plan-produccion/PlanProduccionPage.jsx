import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Title } from '../../shared/ui/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticulos } from '../articulos/api/articulosApi';
import {
  selectArticulosConComposicion,
  selectIsLoading,
  selectError
} from '../articulos/model/selectors/articulosSelectors';
import { PlanProduccionHeader } from './components/PlanProduccionHeader';
import { VistaArticulos } from './components/articulos/VistaArticulos';
import { VistaHilado } from './components/hilado/VistaHilado';

export const PlanProduccionPage = () => {
  const dispatch = useDispatch();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentView, setCurrentView] = useState(0); // 0 para vista de artículos, 1 para vista de hilado
  const articulosConComposicion = useSelector(selectArticulosConComposicion);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchArticulos());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PlanProduccionHeader 
        currentWeek={currentWeek} 
        onWeekChange={setCurrentWeek}
      />

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        p: 2,
        display: 'flex',
        gap: 2,
        backgroundColor: '#f5f5f5',
        position: 'relative'
      }}>
        {/* Content */}
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {currentView === 0 ? (
            <VistaArticulos articulos={articulosConComposicion} />
          ) : (
            <VistaHilado />
          )}
        </Box>

        {/* Navigation Button */}
        <Box sx={{ 
          position: 'absolute',
          left: '50%',
          bottom: 20,
          transform: 'translateX(-50%)',
          zIndex: 1
        }}>
          <Button 
            onClick={() => setCurrentView(prev => prev === 0 ? 1 : 0)}
            variant="contained"
            sx={{ 
              backgroundColor: '#2ecc71',
              color: 'white',
              '&:hover': {
                backgroundColor: '#27ae60'
              }
            }}
          >
            {currentView === 0 ? 'Mostrar Hilado' : 'Mostrar Artículos'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 