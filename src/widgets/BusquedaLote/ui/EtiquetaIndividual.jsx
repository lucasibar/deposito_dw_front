import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { jsPDF } from 'jspdf';

export const EtiquetaIndividual = ({ produccion }) => {
  const imprimirEtiqueta = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Dibujar el borde exterior
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(2, 2, 206, 60);

    // Dibujar líneas horizontales
    doc.line(2, 18, 208, 18); // Primera línea horizontal
    doc.line(2, 34, 208, 34); // Segunda línea horizontal
    doc.line(2, 50, 208, 50); // Tercera línea horizontal para la fecha

    // Dibujar línea vertical central
    doc.line(105, 2, 105, 62);

    // Configurar el estilo de la fuente
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');

    // Agregar el logo o título
    doc.text('DER WILL', 105, 12, { align: 'center' });

    // Configurar el estilo para el contenido
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');

    // Agregar la información en las celdas
    // Columna izquierda
    doc.text('Máquina:', 5, 25);
    doc.text(`${produccion.maquina.tipoMaquina} ${produccion.maquina.numeroMaquina}`, 5, 30);
    doc.text('Artículo:', 5, 41);
    doc.text(`${produccion.articulo.codigoArticulo} - ${produccion.articulo.talle}`, 5, 46);

    // Columna derecha
    doc.text('Legajo:', 107, 25);
    doc.text(`Nº ${produccion.legajo.numeroLegajo} - ${produccion.legajo.turno}`, 107, 30);
    doc.text('Unidades:', 107, 41);
    doc.text(`${produccion.unidades}`, 107, 46);

    // Agregar la fecha en la parte inferior
    const fecha = new Date(produccion.fecha).toLocaleDateString();
    doc.text('Fecha:', 5, 55);
    doc.text(fecha, 5, 60);

    // Guardar el PDF
    doc.save(`etiqueta_${produccion.numeroLoteProduccion}_${produccion.articulo.codigoArticulo}.pdf`);
  };

  return (
    <Box sx={{ 
      p: 2, 
      border: '1px solid #ddd',
      borderRadius: 1, 
      mb: 2,
      backgroundColor: 'white'
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Máquina:</strong> {produccion.maquina.tipoMaquina} {produccion.maquina.numeroMaquina}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Legajo:</strong> Nº {produccion.legajo.numeroLegajo} - {produccion.legajo.turno}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Artículo:</strong> {produccion.articulo.codigoArticulo} - {produccion.articulo.talle}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Unidades:</strong> {produccion.unidades}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Fecha:</strong> {new Date(produccion.fecha).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2">
            <strong>Lote:</strong> {produccion.numeroLoteProduccion}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <button
            onClick={imprimirEtiqueta}
            style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              marginTop: '8px'
            }}
          >
            Imprimir Etiqueta
          </button>
        </Grid>
      </Grid>
    </Box>
  );
};