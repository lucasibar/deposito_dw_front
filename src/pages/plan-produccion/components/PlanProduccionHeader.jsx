import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Title } from '../../../shared/ui/Title/Title';

export const PlanProduccionHeader = ({ currentWeek, onWeekChange }) => {
  return (
    <Box sx={{ 
      backgroundColor: '#f5f5f5', 
      p: 0.5, 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>
      <Title>Plan de Producción</Title>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mt: 8
      }}>
        <IconButton 
          onClick={() => onWeekChange(prev => Math.max(1, prev - 1))}
          sx={{ 
            color: '#2ecc71',
            '&:hover': {
              backgroundColor: 'rgba(46, 204, 113, 0.1)'
            }
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="body1" sx={{ color: '#2ecc71', fontWeight: 300 }}>
          Semana {currentWeek}
        </Typography>
        <IconButton 
          onClick={() => onWeekChange(prev => prev + 1)}
          sx={{ 
            color: '#2ecc71',
            '&:hover': {
              backgroundColor: 'rgba(46, 204, 113, 0.1)'
            }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}; 