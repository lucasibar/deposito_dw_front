import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DoneIcon from '@mui/icons-material/Done';
import UpdateIcon from '@mui/icons-material/Update';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function BarraCuarentena({ titulo, setFilterState, setFilterTextState }) {
  const [currentIcon, setCurrentIcon] = useState('FilterAlt'); // Estado del ícono actual

  const handleIconClick = () => {
    switch (currentIcon) {
      case 'FilterAlt':
        setCurrentIcon('Done');
        setFilterState('cuarentena');
        break;
      case 'Done':
        setCurrentIcon('Update');
        setFilterState('cuarentena-revision');
        break;
      case 'Update':
        setCurrentIcon('DoneAll');
        setFilterState('cuarentena-aprobada');
        break;
      case 'DoneAll':
        setCurrentIcon('FilterAlt');
        setFilterState(null); // Mostrar todas las partidas
        break;
      default:
        setCurrentIcon('FilterAlt');
        setFilterState(null);
    }
  };

  const getIconComponent = () => {
    switch (currentIcon) {
      case 'Done':
        return <DoneIcon />;
      case 'Update':
        return <UpdateIcon />;
      case 'DoneAll':
        return <DoneAllIcon />;
      default:
        return <FilterAltIcon />;
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setFilterTextState(searchValue); // Actualizar el estado en el componente padre
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="filter"
            sx={{ mr: 2 }}
            onClick={handleIconClick}
          >
            {getIconComponent()}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {titulo}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange} // Manejador para capturar cambios en la barra de búsqueda
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
