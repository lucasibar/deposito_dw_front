import React from 'react';
import { useDispatch } from 'react-redux';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PalletPDF from './PalletPDF';
import { submitGeneratedPallets } from '../../../redux/actions';

const GeneratePallets = ({ pallets }) => {
  const dispatch = useDispatch();

  const handleGeneratePallets = async () => {
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
      <button onClick={handleGeneratePallets}>Generate Pallets</button>
    </div>
  );
};

export default GeneratePallets;