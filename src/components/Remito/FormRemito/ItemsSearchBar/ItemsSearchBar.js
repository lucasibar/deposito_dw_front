import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { agragarPartidaAlRemito, getItems } from '../../../../redux/actions';
import { InputLabel, FormControl, Button, TextField, Divider, Autocomplete, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ItemsSearchBar({ proveedor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems(proveedor));
  }, [proveedor]);

  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(itemsRedux);
  }, [itemsRedux]);

  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const handleChangeItem = (event, newValue) => {
    if (newValue && newValue.agregarNuevo) {
      navigate('/deposito_dw_front/nuevoitem');
    } else {
      setItemSeleccionado(newValue);
    }
  };

  const [partida, setPartida] = useState({
    kilos: "",
    numeroPartida: "",
    unidades: "",
  });

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    const isNumeric = /^[0-9]*$/.test(value);
    if (isNumeric || value === "") {
      setPartida({
        ...partida,
        [field]: value === "" ? "" : parseInt(value, 10)
      });
    }
  };

  const limpiar = () => {
    setPartida({ kilos: "", numeroPartida: "", unidades: "" });
    setItemSeleccionado(null);
  };

  const subirPartida = () => {
    if (itemSeleccionado) {
      const nuevaPartida = {
        ...partida,
        item: itemSeleccionado,
      };
      dispatch(agragarPartidaAlRemito(nuevaPartida));
    }
  };

  const itemsConAgregar = [
    { agregarNuevo: true, categoria: '', descripcion: 'NUEVO ITEM' },
    ...items,
  ];

  return (
    <>
      <div className="remito-form-container" fullWidth>
        <FormControl >
          <Autocomplete
            options={itemsConAgregar}
            getOptionLabel={(option) =>
              option.agregarNuevo ? option.descripcion : `${option.categoria} ${option.descripcion}`
            }
            value={itemSeleccionado}
            onChange={handleChangeItem}
            renderOption={(props, option) => (
              <Box
                component="li"
                {...props}
                sx={{
                  color: option.agregarNuevo ? 'blue' : 'inherit',
                  fontWeight: option.agregarNuevo ? 'bold' : 'normal',
                }}
              >
                {option.agregarNuevo ? option.descripcion : `${option.categoria} ${option.descripcion}`}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar item"
                placeholder="Escribe para buscar..."
              />
            )}
          />
        </FormControl>
      </div>

      {/* Contenedor para Número de Partida, Kilos y Unidades */}
      <div className="partida-form-container">
        <TextField
          className="form-control"
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange('numeroPartida')}
        />
        <TextField
          className="form-control"
          label="Kilos de partida"
          value={partida.kilos}
          onChange={handleInputChange('kilos')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <TextField
          className="form-control"
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange('unidades')}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </div>

      {/* Contenedor de los botones centrados */}
      <div className="button-container">
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px' }} variant="outlined">
          AGREGAR PARTIDA
        </Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px' }} variant="outlined">
          LIMPIAR
        </Button>
      </div>
    </>
  );
}
