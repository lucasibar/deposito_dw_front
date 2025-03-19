import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Container,
  Grid
} from '@mui/material';
import { produccionService } from '../../../features/produccion/api/produccionService';
import SearchIcon from '@mui/icons-material/Search';
import { EtiquetaIndividual } from './EtiquetaIndividual';
import { jsPDF } from 'jspdf';

export const BusquedaLote = () => {
  const [numeroLote, setNumeroLote] = useState('');
  const [producciones, setProducciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    if (!numeroLote.trim()) {
      setError('Por favor ingrese un número de lote');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await produccionService.getProduccionByLote(numeroLote);
      console.log(data);
      setProducciones(data);
    } catch (err) {
      setError('Error al buscar las producciones');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBuscar();
    }
  };

  const imprimirTodasLasEtiquetas = () => {
    if (producciones.length === 0) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Altura de cada etiqueta
    const alturaEtiqueta = 70; // Aumentado de 50 a 70mm por etiqueta
    const margenSuperior = 10; // 10mm de margen superior
    const espacioEntreEtiquetas = 15; // Aumentado de 5 a 15mm entre etiquetas

    producciones.forEach((produccion, index) => {
      // Si no es la primera etiqueta, agregar una nueva página si no hay espacio suficiente
      if (index > 0) {
        const posicionY = margenSuperior + (index * (alturaEtiqueta + espacioEntreEtiquetas));
        if (posicionY + alturaEtiqueta > 280) { // Si la siguiente etiqueta no cabe en la página
          doc.addPage();
        }
      }

      // Calcular la posición Y para esta etiqueta
      const posicionY = margenSuperior + (index * (alturaEtiqueta + espacioEntreEtiquetas)) % 280;

      // Dibujar el borde exterior
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.rect(2, posicionY, 206, 60);

      // Dibujar líneas horizontales
      doc.line(2, posicionY + 16, 208, posicionY + 16); // Primera línea horizontal
      doc.line(2, posicionY + 32, 208, posicionY + 32); // Segunda línea horizontal
      doc.line(2, posicionY + 48, 208, posicionY + 48); // Tercera línea horizontal para la fecha

      // Dibujar línea vertical central
      doc.line(105, posicionY, 105, posicionY + 62);

      // Configurar el estilo de la fuente
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');

      // Agregar el logo o título
      doc.text('DER WILL', 105, posicionY + 10, { align: 'center' });

      // Configurar el estilo para el contenido
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');

      // Agregar la información en las celdas
      // Columna izquierda
      doc.text('Máquina:', 5, posicionY + 23);
      doc.text(`${produccion.maquina.tipoMaquina} ${produccion.maquina.numeroMaquina}`, 5, posicionY + 28);
      doc.text('Artículo:', 5, posicionY + 39);
      doc.text(`${produccion.articulo.codigoArticulo} - ${produccion.articulo.talle}`, 5, posicionY + 44);

      // Columna derecha
      doc.text('Legajo:', 107, posicionY + 23);
      doc.text(`Nº ${produccion.legajo.numeroLegajo} - ${produccion.legajo.turno}`, 107, posicionY + 28);
      doc.text('Unidades:', 107, posicionY + 39);
      doc.text(`${produccion.unidades}`, 107, posicionY + 44);

      // Agregar la fecha en la parte inferior
      const fecha = new Date(produccion.fecha).toLocaleDateString();
      doc.text('Fecha:', 5, posicionY + 55);
      doc.text(fecha, 5, posicionY + 60);
    });

    // Guardar el PDF
    doc.save(`etiquetas_lote_${numeroLote}.pdf`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Número de Lote"
              value={numeroLote}
              onChange={(e) => setNumeroLote(e.target.value)}
              onKeyPress={handleKeyPress}
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleBuscar}
              disabled={loading}
              sx={{ 
                backgroundColor: '#2ecc71',
                '&:hover': {
                  backgroundColor: '#27ae60'
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Buscar'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {producciones.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={imprimirTodasLasEtiquetas}
            sx={{ 
              backgroundColor: '#2ecc71',
              '&:hover': {
                backgroundColor: '#27ae60'
              }
            }}
          >
            Imprimir Todas las Etiquetas
          </Button>
        </Box>
      )}

      {producciones.length > 0 ? (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resultados ({producciones.length})
          </Typography>
          {producciones.map((produccion, index) => (
            <EtiquetaIndividual key={index} produccion={produccion} />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          {loading ? 'Buscando...' : 'No se encontraron producciones para este número de lote'}
        </Typography>
      )}
    </Container>
  );
}; 