import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addPallet, submitGeneratedPallets} from '../../redux/actions';
import ListaPartidasNoAsignadas from './ListaPartidasNoAsignadas/ListaPartidasNoAsignadas';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormularioPallet from './FormularioPallet/FormularioPallet';
// import './ArmadoPallet.css';



import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PalletPDF from './PalletPDF/PalletPDF';

export default function ArmadoPalletS() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const pallets = useSelector((state) => state.pallets);

  const handleAddPallet = (palletData) => {
    dispatch(addPallet(palletData));
    Swal.fire('Pallet creado exitosamente', '', 'success');
  };

  const handleBack = () => {
    navigate('/deposito_dw_front');
  };

 async function submitPallets(e){
    e.preventDefault()

    try {
      const generatedPdfs = await Promise.all(
        pallets.map(async (pallet) => {
          const blob = await pdf(<PalletPDF pallet={pallet} />).toBlob();
          return {
            filename: `pallet-${pallet.id}.pdf`,
            blob,
          };
        })
      );

      generatedPdfs.forEach((pdf) => {
        saveAs(pdf.blob, pdf.filename);
      });

      dispatch(submitGeneratedPallets(pallets));
    } catch (error) {
      console.error('Error generating pallets:', error);
    }

  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            Armado de Pallets
          </Typography>
          <ChevronLeftIcon onClick={handleBack} />
        </Toolbar>
      </AppBar>
      <FormularioPallet onAddPallet={handleAddPallet} partidas={pallets} />
      <Button variant="outlined" onClick={submitPallets} >SUBIR PALLETS</Button>
      <ListaPartidasNoAsignadas pallets={pallets} />
    </div>
  );
}