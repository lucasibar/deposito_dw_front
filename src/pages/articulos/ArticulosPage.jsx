import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Title } from '../../shared/ui/Title/Title';
import { ArticulosList } from './ui/ArticulosList';
import { fetchArticulos } from './api/articulosApi';
import {
  selectArticulosSinComposicion,
  selectArticulosConComposicion,
  selectArticulosInactivos,
  selectIsLoading,
  selectError
} from './model/selectors/articulosSelectors';

export const ArticulosPage = () => {
  const dispatch = useDispatch();
  const articulosSinComposicion = useSelector(selectArticulosSinComposicion);
  const articulosConComposicion = useSelector(selectArticulosConComposicion);
  const articulosInactivos = useSelector(selectArticulosInactivos);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchArticulos())
      .unwrap()
      .catch((error) => console.error('Fetch error:', error));
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
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
      <Box sx={{ 
        backgroundColor: 'primary.main', 
        p: 2, 
        color: 'white'
      }}>
        <Title>Artículos</Title>
      </Box>
      <Box sx={{ 
        flex: 1, 
        p: 2,
        mt: 3, // Margen superior adicional
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' // Centra los elementos horizontalmente
      }}>
        <Box sx={{ 
          width: '100%',
          maxWidth: 800, // Limita el ancho máximo de las listas
          display: 'flex',
          flexDirection: 'column',
          gap: 3 // Espacio entre las listas
        }}>
          <ArticulosList 
            items={articulosSinComposicion} 
            title="Artículos Sin Composición"
            emptyMessage="Ningún artículo para generar composición"
          />
          <ArticulosList 
            items={articulosConComposicion} 
            title="Artículos Con Composición"
            emptyMessage="Ningún artículo en producción"
          />
          <ArticulosList 
            items={articulosInactivos} 
            title="Artículos Inactivos"
            emptyMessage="Ningún artículo desactivado"
          />
        </Box>
      </Box>
    </Box>
  );
}; 