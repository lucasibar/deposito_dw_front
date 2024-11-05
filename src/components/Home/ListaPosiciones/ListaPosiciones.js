import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate

export default function ListaPosiciones() {
  // Acceder a los valores desde Redux
  const posiciones = useSelector((state) => state.posiciones);
  const proveedorSeleccionado = useSelector((state) => state.proveedorSeleccionado);
  const itemSeleccionado = useSelector((state) => state.itemSeleccionado);
  const rackSeleccionado = useSelector((state) => state.rackSeleccionado);
  const filaSeleccionada = useSelector((state) => state.filaSeleccionada);

  const navigate = useNavigate(); // Hook para navegación

  // Filtrar posiciones según los filtros en Redux
  const posicionesFiltradas = posiciones.filter((posicion) => {

    if (proveedorSeleccionado === "VACIOS") {
      return posicion.items.length === 0;
    }

    const coincideProveedor = proveedorSeleccionado 
      ? posicion.items.some((item) => item.proveedor.id === proveedorSeleccionado.id) 
      : true;
    
    const coincideItem = itemSeleccionado 
      ? posicion.items.some((item) => item.itemId === itemSeleccionado.id) 
      : true;
    
    const coincideRack = rackSeleccionado 
      ? posicion.rack === rackSeleccionado 
      : true;
    
    const coincideFila = filaSeleccionada 
      ? posicion.fila === filaSeleccionada 
      : true;

    // Retorna true si todos los filtros coinciden, de lo contrario false
    return coincideProveedor && coincideItem && coincideRack && coincideFila;
  });

  return (
    <>

      <Box >
        {/* Mapear las posiciones filtradas */}
        {posicionesFiltradas.length > 0 ? (
          posicionesFiltradas
            .filter((posicion) => !posicion.entrada) // Filtrar posiciones donde entrada es false
            .map((posicion, index) => {
              // Obtener todos los números de partida
              const numerosDePartida = posicion.items.map((item) => item.partida).join(' / ');

              // Sumar los kilos y las unidades totales de todos los items en la posición
              const totalKilos = posicion.items.reduce((acc, item) => acc + item.kilos, 0);
              const totalUnidades = posicion.items.reduce((acc, item) => acc + item.unidades, 0);

              return (
                <Paper
                  key={index}
                  sx={{
                    padding: 2,
                    marginBottom: 2,
                    borderRadius: '16px',
                    border: itemSeleccionado
                      ? index === 0
                        ? '2px solid green'
                        : index === 1
                        ? '2px solid blue'
                        : null
                      : null
                  }}
                  onClick={() => navigate(`/deposito_dw_front/descripcion-posicion/${posicion.posicionId}`)}
                >
                  {/* Mostrar información de la posición */}
                  <Typography variant="subtitle1">
                    {posicion.pasillo
                      ? `Pasillo: ${posicion.pasillo}`
                      : `Rack ${posicion.rack} - Fila ${posicion.fila} - ${posicion.AB}`}
                  </Typography>

                  {/* Mostrar los números de partidas concatenados */}
                  <Typography variant="body2" mt={2}>
                    Partidas: {numerosDePartida}
                  </Typography>

                  {/* Mostrar los totales de kilos y unidades */}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body2">Kilos: {totalKilos}</Typography>
                    <Typography variant="body2">Unidades: {totalUnidades}</Typography>
                  </Box>
                </Paper>
              );
            })
        ) : (
          <Typography variant="body2" mt={2}>
            No se encontraron posiciones que coincidan con los filtros.
          </Typography>
        )}
      </Box>
    </>
  );
}