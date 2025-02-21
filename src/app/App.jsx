import React from 'react';
import { Route, Routes } from "react-router-dom";
import { RemitoWidget } from '../widgets/remito/RemitoWidget';
import { CuarentenaWidget } from '../widgets/cuarentena/CuarentenaWidget';
import { HistorialWidget } from '../widgets/historial/HistorialWidget';
import { PosicionWidget } from '../widgets/posicion/PosicionWidget';
import { HiladoWidget } from '../widgets/hilado/HiladoWidget';
import { Login } from '../features/auth/ui/Login';
import { CalidadPage } from '../pages/calidad/CalidadPage';  

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/deposito_dw_front/calidad" element={<CalidadPage />} />
        <Route exact path="/deposito_dw_front/" element={<Login />} />
        <Route exact path="/deposito_dw_front/remito" element={<RemitoWidget />} />
        <Route exact path="/deposito_dw_front/deposito-hilado" element={<HiladoWidget />} />
        <Route exact path="/deposito_dw_front/cuarentena" element={<CuarentenaWidget />} />
        <Route exact path="/deposito_dw_front/descripcion-posicion/:id/:rack/:fila/:AB" element={<PosicionWidget />} />
        <Route exact path="/deposito_dw_front/historial-salida" element={<HistorialWidget />} />
      </Routes>
    </div>
  );
}; 