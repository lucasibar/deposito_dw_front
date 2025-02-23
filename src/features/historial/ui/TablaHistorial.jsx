import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  List, 
  ListItem, 
  IconButton 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from 'jspdf';
import { fetchHistorialSalida } from '../model/slice';

export const TablaHistorial = () => {
  const dispatch = useDispatch();
  const remitosSalida = useSelector((state) => state.historial.movimientos);

  useEffect(() => {
    dispatch(fetchHistorialSalida());
  }, [dispatch]);

  const generatePDF = (remito) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Detalle del Remito', 10, 10);
    doc.setFontSize(12);
    doc.text(`Número de Remito: ${remito.numeroRemito || 'Sin número'}`, 10, 20);
    doc.text(`Fecha: ${remito.fecha}`, 10, 30);
    doc.text(`Proveedor: ${remito.proveedor}`, 10, 40);

    doc.setFontSize(14);
    doc.text('Items:', 10, 50);
    doc.setFontSize(12);

    let y = 60;
    remito.items.forEach((item) => {
      doc.text(
        `Proveedor: ${item.proveedor || 'Sin proveedor'}, Descripción: ${item.categoria} ${item.descripcion}`,
        10,
        y
      );
      doc.text(
        `   Partida: ${item.partida || 'Sin partida'}, Kilos: ${item.kilos} kg, Unidades: ${item.unidades}`,
        10,
        y + 10
      );
      y += 20;
    });

    doc.save(`remito_${remito.numeroRemito || 'sin_numero'}.pdf`);
  };

  return (
    <>
      {remitosSalida && remitosSalida.length > 0 ? (
        remitosSalida.map((remito, index) => (
          <Accordion
            key={index}
            sx={{
              marginBottom: 2,
              border: remito.proveedor === 'Rechazo' ? '1px solid red' : 'none',
              backgroundColor: remito.proveedor === 'Rechazo' ? 'rgba(255, 0, 0, 0.1)' : 'white',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <IconButton
                aria-label="Generar PDF"
                onClick={(e) => {
                  e.stopPropagation();
                  generatePDF(remito);
                }}
                sx={{
                  padding: 0,
                  marginRight: '8px',
                  alignSelf: 'center',
                }}
              >
                <PictureAsPdfIcon />
              </IconButton>
              <Typography variant="body1">
                {remito.fecha} {remito.proveedor} {remito.numeroRemito || 'Sin número'}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <List sx={{ padding: 0 }}>
                {remito.items.map((item, itemIndex) => (
                  <ListItem
                    key={itemIndex}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: '4px 8px',
                      borderBottom: itemIndex < remito.items.length - 1 ? '1px solid #ddd' : 'none',
                    }}
                  >
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {item.proveedor || 'Sin proveedor'}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      Partida {item.partida || 'Sin partida'}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 2 }}>
                      {item.categoria} {item.descripcion}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
                      {item.kilos} kg
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>
                      {item.unidades} unidades
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="body1">No hay movimientos de salida registrados.</Typography>
      )}
    </>
  );
}; 