import React from 'react';
import { Route, Routes } from "react-router-dom";
import { CuarentenaWidget } from '../widgets/cuarentena/CuarentenaWidget';
import { HistorialWidget } from '../widgets/historial/HistorialWidget';
import { PosicionWidget } from '../widgets/posicion/PosicionWidget';
import { HiladoWidget } from '../widgets/hilado/HiladoWidget';
import { Login } from '../features/auth/ui/Login';
import { CalidadPage } from '../pages/calidad/CalidadPage';
import { StockPage } from '../pages/stock/StockPage';
import { ConsumosPage } from '../pages/consumos/ConsumosPage';
import { RemitoEntradaInsumosPage } from '../pages/remito-entrada-insumos/RemitoEntradaInsumosPage';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/deposito_dw_front/remito-entrada" element={<RemitoEntradaInsumosPage />} />
        <Route exact path="/deposito_dw_front/deposito-hilado" element={<HiladoWidget />} />
        <Route exact path="/deposito_dw_front/cuarentena" element={<CuarentenaWidget />} />
        <Route exact path="/deposito_dw_front/descripcion-posicion/:id/:rack/:fila/:AB" element={<PosicionWidget />} />
        <Route exact path="/deposito_dw_front/historial-salida" element={<HistorialWidget />} />
        <Route path="/deposito_dw_front/calidad" element={<CalidadPage />} />
        <Route path="/deposito_dw_front/stock" element={<StockPage />} />
        <Route path="/deposito_dw_front/consumos" element={<ConsumosPage />} />
        <Route exact path="/deposito_dw_front/" element={<Login />} />
      </Routes>
    </div>
  );
}; 