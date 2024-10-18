import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Para obtener el id de la posición desde params
import { obtenerItemsPorPosicion, agregarARemitoSalida, ajusteSuma, ajusteResta } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import { Paper, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

export default function Posicion() {
//   const { id } = useParams(); // Obtener el id de la posición desde los params
//   const dispatch = useDispatch();

//   // Estado para los ítems asignados a la posición
//   const itemsPosicion = useSelector((state) => state.itemsPosicion);

//   // Estado para los ítems seleccionados
//   const [itemsSeleccionados, setItemsSeleccionados] = useState([]);

//   // Cargar los ítems de la posición al montar el componente
//   useEffect(() => {
//     dispatch(obtenerItemsPorPosicion(id)); // Dispatch para obtener los ítems según la posición
//   }, [dispatch, id]);

//   // Función para seleccionar o deseleccionar un ítem
//   const seleccionarItem = (item) => {
//     if (itemsSeleccionados.includes(item)) {
//       // Si el ítem ya está seleccionado, lo deseleccionamos
//       setItemsSeleccionados(itemsSeleccionados.filter((i) => i !== item));
//     } else {
//       // Si no está seleccionado, lo añadimos
//       setItemsSeleccionados([...itemsSeleccionados, item]);
//     }
//   };

//   // Función para agregar los ítems seleccionados al remito de salida
//   const agregarRemitoSalida = () => {
//     if (itemsSeleccionados.length > 0) {
//       dispatch(agregarARemitoSalida(itemsSeleccionados));
//       setItemsSeleccionados([]); // Limpiamos los ítems seleccionados después de agregar
//     }
//   };

//   // Función para ajuste suma
//   const handleAjusteSuma = () => {
//     dispatch(ajusteSuma(itemsSeleccionados));
//   };

//   // Función para ajuste resta
//   const handleAjusteResta = () => {
//     dispatch(ajusteResta(itemsSeleccionados));
//   };

  return (
     <div>
    
    </div>
  );
}