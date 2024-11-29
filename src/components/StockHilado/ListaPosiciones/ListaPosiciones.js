import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

export default function ListaPosiciones({ inputBarraNavegador }) {
  const navigate = useNavigate();
  const posiciones = useSelector((state) => state.posiciones);

  // Convertir el texto del usuario a minúsculas para comparación insensible a mayúsculas
  const searchText = inputBarraNavegador.toLowerCase();

  // Filtrar posiciones según el texto ingresado
  const posicionesFiltradas = posiciones.filter((posicion) => {
    // Excluir posiciones con `entrada: true`
    if (posicion.entrada) return false;

    // Caso 1: Buscar por rack y fila ("número-guion-número")
    if (/^\d+-\d+$/.test(searchText)) {
      const [rack, fila] = searchText.split('-').map(Number);
      return posicion.rack === rack && posicion.fila === fila;
    }

    // Caso 2: Buscar por un solo número (pasillo o rack)
    if (/^\d+$/.test(searchText)) {
      const numero = Number(searchText);
      return posicion.pasillo === numero || posicion.rack === numero;
    }

    // Caso 3: Búsqueda general
    return posicion.items.some((item) => {
      const partidaIncluyeTexto = item.partida.toString().includes(searchText);
      const nombreProveedorIncluyeTexto = item.proveedor.nombre.toLowerCase().includes(searchText);
      const descripcionIncluyeTexto = item.descripcion.toLowerCase().includes(searchText);

      return partidaIncluyeTexto || nombreProveedorIncluyeTexto || descripcionIncluyeTexto;
    });
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
              borderRadius: '16px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
            onClick={() =>
              navigate(
                `/deposito_dw_front/descripcion-posicion/${posicion.posicionId}/${posicion.rack}/${posicion.fila}/${posicion.AB}`
              )
            }
          >
            {/* Información principal de la posición */}
            <Typography variant="subtitle1">
              {posicion.pasillo
                ? `Pasillo: ${posicion.pasillo}`
                : `Fila ${posicion.rack || 'N/A'} - Rack ${posicion.fila || 'N/A'} - ${posicion.AB || 'N/A'}`}
            </Typography>

            {/* Lista de items o texto "VACÍO" */}
            {posicion.items.length > 0 ? (
              <Box mt={2}>
                {posicion.items.map((item, idx) => (
                  <Typography key={idx} variant="body2" mt={1}>
                    {item.categoria} - {item.descripcion} | Partida: {item.partida}
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
