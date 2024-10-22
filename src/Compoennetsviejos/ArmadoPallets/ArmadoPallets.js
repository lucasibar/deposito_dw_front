import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { addPallet, submitGeneratedPallets } from '../../redux/actions';
import ListaPartidasNoAsignadas from './ListaPartidasNoAsignadas/ListaPartidasNoAsignadas';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormularioPallet from './FormularioPallet/FormularioPallet';
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

  const submitPallets = async (e) => {
    e.preventDefault();
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
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Armado de Pallets
          </Typography>
          <ChevronLeftIcon onClick={handleBack} />
        </Toolbar>
      </AppBar>
      <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        <FormularioPallet onAddPallet={handleAddPallet} partidas={pallets} />
        <Button
          variant="outlined"
          onClick={submitPallets}
          sx={{ width: '100%', mt: '20px' }}
        >
          SUBIR PALLETS
        </Button>
        <ListaPartidasNoAsignadas pallets={pallets} />
      </div>
    </div>
  );
}