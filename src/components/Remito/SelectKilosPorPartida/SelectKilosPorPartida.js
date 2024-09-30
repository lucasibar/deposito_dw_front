import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agragarPartidaAlRemito } from '../../../redux/actions';
import { Button, TextField } from '@mui/material';
import SelectItem from './SelectItem/SelectItem';

export default function SelectKilosPorPartida() {
  const dispatch = useDispatch();

  let partidaInitialSatate={
    item:{},
    kilos: "",
    numeroPartida: "",
    unidades: "",
  }
  const [partida, setPartida] = useState(partidaInitialSatate);


  const cargarRegistroItem = (item) => {
    setPartida((prevPartida) => ({
      ...prevPartida,
      item
    }));
  };

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
    setPartida(partidaInitialSatate);
  };
  const subirPartida = () => {
    dispatch(agragarPartidaAlRemito(partida));
  };
  

    return (
      <>

       <SelectItem cargarRegistroItem= {cargarRegistroItem}/>
     
      <div className="partida-form-container">
        <TextField
          className="form-control"
          id="numero-partida"
          label="Número de partida"
          value={partida.numeroPartida}
          onChange={handleInputChange('numeroPartida')}
        />

        <TextField
          className="form-control"
          id="kilos"
          label="Kilos de partida"
          value={partida.kilos}
          onChange={handleInputChange('kilos')}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />

        <TextField
          className="form-control"
          id="unidades"
          label="Unidades"
          value={partida.unidades}
          onChange={handleInputChange('unidades')}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*'
          }}
        />
      </div>

      {/* Contenedor de los botones centrados */}
      <div className="button-container">
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px'}} variant="outlined">AGREGAR PARTIDA</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px'}} variant="outlined">LIMPIAR</Button>

      </div>


    </>
  );
}