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
  const partidas = useSelector(selectPartidas);
  const status = useSelector(selectStatus);
  
  // Obtener estados únicos de las partidas
  const estados = React.useMemo(() => {
    if (!partidas || !Array.isArray(partidas)) return [];
    
    const uniqueStates = [...new Set(partidas.map(partida => 
      partida.estado || 'sin-estado'
    ))];
    return uniqueStates.sort();
  }, [partidas]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Formatear el texto del estado para mostrarlo más amigable
  const formatEstado = (estado) => {
    return estado
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (status === 'loading' || !estados.length) {
    return <div>Cargando estados...</div>;
  }

  return (
    <Box sx={{ 
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      position: 'relative'
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
              minHeight: '48px'
            },
            '& .Mui-selected': {
              color: '#333333 !important',
              fontWeight: 500,
              opacity: 1
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2ecc71'
            },
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {estados.map((estado, index) => (
            <Tab 
              key={estado}
              label={formatEstado(estado)} 
              {...a11yProps(index)}
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