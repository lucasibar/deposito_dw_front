import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  InputBase 
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DoneIcon from '@mui/icons-material/Done';
import UpdateIcon from '@mui/icons-material/Update';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SearchIcon from '@mui/icons-material/Search';
import { setFilterState, setFilterText } from '../model/slice';

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

export const BarraCuarentena = ({ titulo }) => {
  const dispatch = useDispatch();
  const [currentIcon, setCurrentIcon] = useState('FilterAlt');

  const handleIconClick = () => {
    switch (currentIcon) {
      case 'FilterAlt':
        setCurrentIcon('Done');
        dispatch(setFilterState('cuarentena'));
        break;
      case 'Done':
        setCurrentIcon('Update');
        dispatch(setFilterState('cuarentena-revision'));
        break;
      case 'Update':
        setCurrentIcon('DoneAll');
        dispatch(setFilterState('cuarentena-aprobada'));
        break;
      case 'DoneAll':
        setCurrentIcon('FilterAlt');
        dispatch(setFilterState(null));
        break;
      default:
        setCurrentIcon('FilterAlt');
        dispatch(setFilterState(null));
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
    dispatch(setFilterText(e.target.value));
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
              onChange={handleSearchChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}; 