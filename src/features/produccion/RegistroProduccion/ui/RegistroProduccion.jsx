import React from 'react';
import { ProduccionForm } from '../../../../widgets/ProduccionForm';
import { useSnackbar } from 'notistack';

export const RegistroProduccion = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitProduccion = async (formData) => {
    try {
      // TODO: Aquí irá la llamada a la API cuando la implementemos
      console.log('Datos de producción:', formData);
      
      enqueueSnackbar('Producción registrada exitosamente', { 
        variant: 'success'
      });
    } catch (error) {
      enqueueSnackbar('Error al registrar la producción', { 
        variant: 'error'
      });
      console.error('Error:', error);
    }
  };

  return (
    <ProduccionForm onSubmit={handleSubmitProduccion} />
  );
}; 