import { configureStore } from '@reduxjs/toolkit';
import hiladoReducer from '../../features/hilado/model/slice';
import posicionesReducer from '../../features/posicion/model/slice';
import remitoReducer from '../../features/remito/model/slice';
import historialReducer from '../../features/historial/model/slice';
import cuarentenaReducer from '../../features/cuarentena/model/slice';
import posicionDetalleReducer from '../../features/posicion/model/slice';
import partidasReducer from '../../features/partidas/model/slice';
import stockReducer from '../../features/stock/model/slice';

export const store = configureStore({
  reducer: {
    hilado: hiladoReducer,
    posiciones: posicionesReducer,
    remito: remitoReducer,
    historial: historialReducer,
    cuarentena: cuarentenaReducer,
    posicionDetalle: posicionDetalleReducer,
    partidas: partidasReducer,
    stock: stockReducer,
  },
}); 