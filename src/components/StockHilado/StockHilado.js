import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { getPosiciones } from "../../redux/actions";
import ListaPosiciones from "./ListaPosiciones/ListaPosiciones";
import BarraNavegador from "./BarraNavegador/BarraNavegador";
import BotonesNavegacion from "../Utils/BotonesNavegacion/BotonesNavegacion";

export default function StockHilado() {
  const dispatch = useDispatch();

  const [inputBarraNavegador, setInputBarraNavegador] = useState("");
  const [rack, setRack] = useState("");
  const [fila, setFila] = useState("");
  const [pasillo, setPasillo] = useState("");

  useEffect(() => {
    dispatch(getPosiciones());
  }, [dispatch]);

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
        />
      </Box>
    </>
  );
}
