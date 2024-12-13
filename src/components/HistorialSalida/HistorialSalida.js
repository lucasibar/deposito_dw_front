import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovimientosSalida } from '../../redux/actions';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, List, ListItem, Divider, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import NavBar from '../Utils/NavBar';
import { jsPDF } from 'jspdf';

export default function HistorialSalida() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the data when the component mounts
  useEffect(() => {
    dispatch(fetchMovimientosSalida());
  }, [dispatch]);

  // Get remitosSalida data from the Redux store
  const remitosSalida = useSelector((state) => state.movimientosHistoricoSalida);

  // Generate PDF for a specific remito
  const generatePDF = (remito) => {
    const doc = new jsPDF();

    // Add remito details
    doc.setFontSize(16);
    doc.text('Detalle del Remito', 10, 10);
    doc.setFontSize(12);
    doc.text(`Número de Remito: ${remito.numeroRemito || 'Sin número'}`, 10, 20);
    doc.text(`Fecha: ${remito.fecha}`, 10, 30);
    doc.text(`Proveedor: ${remito.proveedor}`, 10, 40);

    // Add items table
    doc.setFontSize(14);
    doc.text('Items:', 10, 50);
    doc.setFontSize(12);

    let y = 60;
    remito.items.forEach((item, index) => {
      doc.text(`${index + 1}. Proveedor: ${item.proveedor || 'Sin proveedor'}, Descripción: ${item.descripcion}`, 10, y);
      doc.text(`   Kilos: ${item.kilos} kg, Unidades: ${item.unidades}`, 10, y + 10);
      y += 20;
    });

    // Save the PDF
    doc.save(`remito_${remito.numeroRemito || 'sin_numero'}.pdf`);
  };

  return (
    <>
      <NavBar titulo={"Historial de salida"} />
      <Box sx={{ padding: 2 }}>
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
              {/* Accordion Summary */}
              <AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls={`panel${index}-content`}
  id={`panel${index}-header`}
  sx={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // Asegura que todos los elementos estén alineados verticalmente
    gap: '20px', // Espaciado entre elementos
  }}
>
  <IconButton
    aria-label="Generar PDF"
    onClick={(e) => {
      e.stopPropagation(); // Evitar que se expanda el acordeón al hacer clic
      generatePDF(remito);
    }}
    sx={{
      padding: 0, // Elimina el espacio interno del botón
      marginRight: '8px', // Opcional: Añade espacio entre el botón y el texto
      alignSelf: 'center', // Asegura que el botón esté centrado verticalmente
    }}
  >
    <PictureAsPdfIcon />
  </IconButton>
  <Typography variant="body1">
    {remito.fecha} {remito.proveedor} {remito.numeroRemito || 'Sin número'}
  </Typography>
</AccordionSummary>

              {/* Accordion Details */}
              <AccordionDetails>
                <List sx={{ padding: 0 }}>
                  {remito.items.map((item, itemIndex) => (
                    <ListItem
                      key={itemIndex}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '4px 8px', // Reducir el espacio entre ítems
                        borderBottom: itemIndex < remito.items.length - 1 ? '1px solid #ddd' : 'none',
                      }}
                    >
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {item.proveedor || 'Sin proveedor'}
                      </Typography>
                      <Typography variant="body2" sx={{ flex: 2 }}>
                        {item.descripcion}
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
      </Box>
    </>
  );
}
