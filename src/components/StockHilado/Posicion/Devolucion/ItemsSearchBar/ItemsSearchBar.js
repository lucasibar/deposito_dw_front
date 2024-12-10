import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../../../redux/actions";
import { TextField, FormControl, Autocomplete, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ItemsSearchBar({ proveedor, setItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Estado local para manejar los ítems
  const itemsRedux = useSelector((state) => state.itemsProveedor);
  const [items, setItems] = useState([]);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  useEffect(() => {
    if (proveedor) {
      dispatch(getItems(proveedor)); // Cargar ítems desde Redux según el proveedor
    }
  }, [proveedor, dispatch]);

  useEffect(() => {
    const itemsConAgregar = [
      { agregarNuevo: true, categoria: "", descripcion: "NUEVO ITEM" }, // Opción para agregar nuevo ítem
      ...itemsRedux,
    ];
    setItems(itemsConAgregar);
  }, [itemsRedux]);

  const handleChangeItem = (event, newValue) => {
    if (newValue && newValue.agregarNuevo) {
      navigate("/deposito_dw_front/nuevoitem"); // Navegar a la página de agregar nuevo ítem
    } else {
      setItemSeleccionado(newValue); // Actualizar el ítem seleccionado
      setItem(newValue); // Notificar al componente padre
    }
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          options={items}
          getOptionLabel={(option) =>
            option.agregarNuevo ? option.descripcion : `${option.categoria} ${option.descripcion}`
          }
          value={itemSeleccionado}
          onChange={handleChangeItem}
          renderOption={(props, option) => (
            <Box
            key={props}
            component="li"
            {...props}
            sx={{
            color: option.agregarNuevo ? "blue" : "inherit",
            fontWeight: option.agregarNuevo ? "bold" : "normal",
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
    </Box>
  );
}
