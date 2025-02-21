import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { ListaPosiciones } from "../../../../features/posicion/ui/ListaPosiciones";
import { BarraNavegador } from "../../../../features/hilado/ui/BarraNavegador";
import { BotonesNavegacion } from "../../../../shared/ui/BotonesNavegacion";
import { fetchPosiciones } from "../../../../features/posicion/model/slice";
import { setFilters } from "../../../../features/hilado/model/slice";
import { useNavigate } from 'react-router-dom';

export const HiladoWidget = () => {
  const dispatch = useDispatch();
  const [inputBarraNavegador, setInputBarraNavegador] = useState("");
  const [rack, setRack] = useState("");
  const [fila, setFila] = useState("");
  const [pasillo, setPasillo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosiciones());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilters({
      searchText: inputBarraNavegador,
      rack,
      fila,
      pasillo
    }));
  }, [dispatch, inputBarraNavegador, rack, fila, pasillo]);

  const handlePosicionClick = (posicion) => {
    navigate(`/deposito_dw_front/descripcion-posicion/${posicion.posicionId}/${posicion.rack}/${posicion.fila}/${posicion.AB}`);
  };

  return (
    <>
      <BarraNavegador
        titulo={"Der Will"}
        setInputBarraNavegador={setInputBarraNavegador}
        setRack={setRack}
        setFila={setFila}
        setPasillo={setPasillo}
      />
      <BotonesNavegacion pagina="depositohilado" />
      <Box sx={{ padding: 2 }}>
        <ListaPosiciones
          inputBarraNavegador={inputBarraNavegador}
          rack={rack}
          fila={fila}
          pasillo={pasillo}
          onPosicionClick={handlePosicionClick}
        />
      </Box>
    </>
  );
}; 