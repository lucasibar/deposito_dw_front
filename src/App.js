import React from 'react';
import { Route, Routes } from "react-router-dom";
import Remito from './components/Remito/Remito'
import NuevoItem from './components/Remito/FormRemito/NuevoItem/NuevoItem'
import Cuarentena from './components/Cuarentena/Cuarentena'
import Salida from './components/Salida/Salida';
import HistorialSalida from './components/HistorialSalida/HistorialSalida';
import Posicion from './components/StockHilado/Posicion/Posicion';
import Agenda from './components/Utils/Agenda/Agenda';
import QRDisplay from './components/Utils/Qr/QRDisplay';
import StockHilado from './components/StockHilado/StockHilado';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/deposito_dw_front/" element={<Login />} />
      <Route exact path="/deposito_dw_front/remito" element={<Remito />} />
      <Route exact path="/deposito_dw_front/deposito-hilado" element={<StockHilado />} />
        <Route exact path="/deposito_dw_front/cuarentena" element={<Cuarentena />} />
        <Route exact path="/deposito_dw_front/descripcion-posicion/:id/:rack/:fila/:AB" element={<Posicion />} /> {/* Ruta con el parámetro id */}
        <Route exact path="/deposito_dw_front/historial-salida" element={<HistorialSalida />} /> {/* Ruta con el parámetro id */}
        <Route exact path="/deposito_dw_front/salida" element={<Salida />} />
        <Route exact path="/deposito_dw_front/nuevoitem" element={<NuevoItem />} />
        {/* <Route exact path="/deposito_dw_front/nuevoproveedor" element={<NuevoProveedor />} /> */}
        <Route exact path="/deposito_dw_front/agenda" element={<Agenda />} />
        <Route exact path="/deposito_dw_front/qr" element={<QRDisplay />} />

        {/* <Route path="*" element={<Error404 />} /> */}

      </Routes>
    </div>
  );
}
export default App;