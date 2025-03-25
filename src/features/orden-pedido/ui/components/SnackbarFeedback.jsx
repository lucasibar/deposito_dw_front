import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { setSnackbar } from '../../model/slice';

const SnackbarFeedback = () => {
  const dispatch = useDispatch();
  const { snackbar } = useSelector(state => state.ordenPedido.ui);

  return (
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={() => dispatch(setSnackbar({ open: false }))}
    >
      <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
    </Snackbar>
  );
};

export default SnackbarFeedback; 