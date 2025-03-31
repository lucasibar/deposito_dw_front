import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Title } from '../../shared/ui/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticulos } from '../articulos/api/articulosApi';
import {
  selectArticulosConComposicion,
  selectIsLoading,
  selectError
} from '../articulos/model/selectors/articulosSelectors';

export const PlanProduccionPage = () => {
  const dispatch = useDispatch();
  const [currentWeek, setCurrentWeek] = useState(1);
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
      {/* Header */}
      <Box sx={{ 
        backgroundColor: 'primary.main', 
        p: 2, 
        color: 'white'
      }}>
        <Title>Plan de Producción</Title>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2,
          mt: 8
        }}>
          <IconButton 
            onClick={() => setCurrentWeek(prev => Math.max(1, prev - 1))}
            sx={{ color: 'white' }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6">
            Semana {currentWeek}
          </Typography>
          <IconButton 
            onClick={() => setCurrentWeek(prev => prev + 1)}
            sx={{ color: 'white' }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        p: 2,
        display: 'flex',
        gap: 2,
        backgroundColor: '#f5f5f5'
      }}>
        {/* Left Side */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Artículos a Producir
            </Typography>
            <List>
              {articulosConComposicion.map((articulo) => (
                <ListItem key={articulo.id}>
                  <ListItemText
                    primary={`Código: ${articulo.codigo}`}
                    secondary={`Largo: ${articulo.largo} - Talle: ${articulo.talle}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Artículos Asignados en esta Semana
            </Typography>
            {/* Aquí irá el contenido de artículos asignados */}
          </Paper>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Artículos Producidos
            </Typography>
            {/* Aquí irá el contenido de artículos producidos */}
          </Paper>
        </Box>

        {/* Right Side */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Hilado Necesario
            </Typography>
            {/* Aquí irá el contenido de hilado necesario */}
          </Paper>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Hilado a Utilizar
            </Typography>
            {/* Aquí irá el contenido de hilado a utilizar */}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}; 