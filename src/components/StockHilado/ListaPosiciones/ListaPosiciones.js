import React from "react";
import { useSelector } from "react-redux";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function ListaPosiciones({
  inputBarraNavegador,
  rack,
  fila,
  pasillo,
}) {
  const navigate = useNavigate();
  const posiciones = useSelector((state) => state.posiciones);

  // Convertir el texto del usuario a minúsculas
  const searchText = inputBarraNavegador.toLowerCase();

  const posicionesFiltradas = posiciones.filter((posicion) => {
    if (posicion.entrada) return false;

    // Validar el filtro por rack
    const cumpleRack = rack ? posicion.rack === Number(rack) : true;

    // Validar el filtro por fila
    const cumpleFila = fila ? posicion.fila === Number(fila) : true;

    // Validar el filtro por pasillo
    const cumplePasillo = pasillo ? posicion.pasillo === Number(pasillo) : true;

    // Búsqueda general (proveedor, partida, descripción o material)
    const cumpleBusquedaGeneral = posicion.items.some((item) => {
      const partidaIncluyeTexto = item.partida
        ?.toString()
        .includes(searchText);
      const nombreProveedorIncluyeTexto = item.proveedor?.nombre
        .toLowerCase()
        .includes(searchText);
      const descripcionIncluyeTexto = item.descripcion
        ?.toLowerCase()
        .includes(searchText);
      const materialIncluyeTexto = item.categoria
        ?.toLowerCase()
        .includes(searchText);

      return (
        partidaIncluyeTexto ||
        nombreProveedorIncluyeTexto ||
        descripcionIncluyeTexto ||
        materialIncluyeTexto
      );
    });

    // Devuelve posiciones que cumplan con rack, fila y pasillo,
    // incluso si no tienen items
    return cumpleRack && cumpleFila && cumplePasillo && (cumpleBusquedaGeneral || posicion.items.length === 0);
  });

  return (
    <Box>
      {posicionesFiltradas.length > 0 ? (
        posicionesFiltradas.map((posicion) => (
          <Paper
            key={posicion.posicionId}
            sx={{
              padding: 2,
              marginBottom: 2,
              borderRadius: "16px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() =>
              navigate(
                `/deposito_dw_front/descripcion-posicion/${posicion.posicionId}/${posicion.rack}/${posicion.fila}/${posicion.AB}`
              )
            }
          >
            <Typography variant="subtitle1">
              {`Pasillo: ${posicion.pasillo || "N/A"} - Rack: ${
                posicion.rack || "N/A"
              } - Fila: ${posicion.fila || "N/A"} - ${
                posicion.AB || "N/A"
              }`}
            </Typography>
            {posicion.items.length > 0 ? (
              <Box mt={2}>
                {posicion.items.map((item, idx) => (
                  <Typography key={idx} variant="body2" mt={1}>
                    {item.categoria} - {item.descripcion} | Partida:{" "}
                    {item.partida}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography variant="subtitle2" mt={2} color="text.secondary">
                VACÍO
              </Typography>
            )}
          </Paper>
        ))
      ) : (
        <Typography variant="body2" mt={2} align="center" color="text.secondary">
          No se encontraron posiciones que coincidan con los filtros.
        </Typography>
      )}
    </Box>
  );
}
