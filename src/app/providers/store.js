import { configureStore } from '@reduxjs/toolkit';
import hiladoReducer from '../../features/hilado/model/slice';
import posicionesReducer from '../../features/posicion/model/slice';
import remitosReducer from '../../features/remitos/model/slice';
import historialReducer from '../../features/historial/model/slice';
import cuarentenaReducer from '../../features/cuarentena/model/slice';
import partidasReducer from '../../features/partidas/model/slice';

export const store = configureStore({
  reducer: {
    hilado: hiladoReducer,
    posiciones: posicionesReducer,
    remitos: remitosReducer,
    historial: historialReducer,
    cuarentena: cuarentenaReducer,
    partidas: partidasReducer,
  },
}); 