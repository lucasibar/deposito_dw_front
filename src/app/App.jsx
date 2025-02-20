import React from 'react';
import { Route, Routes } from "react-router-dom";
import { RemitoWidget } from '../widgets/remito/RemitoWidget';
import { CuarentenaWidget } from '../widgets/cuarentena/CuarentenaWidget';
import { HistorialWidget } from '../widgets/historial/HistorialWidget';
import { PosicionWidget } from '../widgets/posicion/PosicionWidget';
import { StockHiladoWidget } from '../widgets/stock/StockHiladoWidget';
import Login from '../components/Login/Login';
import NuevoItem from '../components/Remito/FormRemito/NuevoItem/NuevoItem';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/deposito_dw_front/" element={<Login />} />
        <Route exact path="/deposito_dw_front/remito" element={<RemitoWidget />} />
        <Route exact path="/deposito_dw_front/deposito-hilado" element={<StockHiladoWidget />} />
        <Route exact path="/deposito_dw_front/cuarentena" element={<CuarentenaWidget />} />
        <Route exact path="/deposito_dw_front/descripcion-posicion/:id/:rack/:fila/:AB" element={<PosicionWidget />} />
        <Route exact path="/deposito_dw_front/historial-salida" element={<HistorialWidget />} />
        <Route exact path="/deposito_dw_front/nuevoitem" element={<NuevoItem />} />
      </Routes>
    </div>
  );
}; 