import { configureStore } from '@reduxjs/toolkit';
import posicionReducer from '../features/posicion/model/slice';
import movimientosReducer from '../features/movimientos/model/slice';
import remitosReducer from '../features/remitos/model/slice';

export const store = configureStore({
  reducer: {
    posicion: posicionReducer,
    movimientos: movimientosReducer,
    remitos: remitosReducer,
  },
}); 