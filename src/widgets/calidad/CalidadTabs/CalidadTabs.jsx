import * as React from 'react';
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { selectPartidas, selectStatus } from '../../../features/partidas/model/selectors';
import { PartidaList } from '../../partidas/PartidaList/PartidaList';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calidad-tabpanel-${index}`}
      aria-labelledby={`calidad-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `calidad-tab-${index}`,
    'aria-controls': `calidad-tabpanel-${index}`,
  };
}

export const CalidadTabs = ({ searchTerms }) => {
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Estados ordenados como se requiere
  const estados = ['cuarentena', 'cuarentena-revision', 'cuarentena-aprobada'];

  // Formatear el texto del estado para mostrarlo más amigable
  const formatEstado = (estado) => {
    switch (estado) {
      case 'cuarentena':
        return 'En Cuarentena';
      case 'cuarentena-revision':
        return 'En Revisión';
      case 'cuarentena-aprobada':
        return 'Aprobadas';
      default:
        return estado;
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      position: 'relative',
      backgroundColor: '#f5f5f5',
      borderRadius: '4px',
      padding: '0',
      boxShadow: 'none'
    }}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="calidad tabs"
          textColor="inherit"
          indicatorColor="primary"
          sx={{ 
            '& .MuiTab-root': { 
              color: '#333333',
              fontWeight: 400,
              opacity: 0.7,
              textTransform: 'none',
              fontSize: '1.1rem',
              minHeight: '48px',
              backgroundColor: '#f5f5f5',
              marginRight: '4px',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              '&:hover': {
                opacity: 1
              }
            },
            '& .Mui-selected': {
              color: '#333333 !important',
              fontWeight: 500,
              opacity: 1,
              backgroundColor: '#f5f5f5',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2ecc71'
            },
            flex: 1
          }}
        >
          {estados.map((estado, index) => (
            <Tab 
              key={estado}
              label={formatEstado(estado)} 
              {...a11yProps(index)}
              sx={{
                marginRight: estado === 'cuarentena-aprobada' ? 'auto' : 'inherit'
              }}
            />
          ))}
        </Tabs>
      </Box>
      {estados.map((estado, index) => (
        <CustomTabPanel key={estado} value={value} index={index}>
          <PartidaList estado={estado} searchTerms={searchTerms} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}; 