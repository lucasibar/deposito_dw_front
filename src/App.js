import React from 'react';
import { Route, Routes } from "react-router-dom";
import Remito from './components/Remito/Remito'
import NuevoItem from './components/Remito/FormRemito/ItemsSearchBar/NuevoItem/NuevoItem'
import Cuarentena from './components/Cuarentena/Cuarentena'
import Home from './components/Home/Home'
import Salida from './components/Salida/Salida';
import MovimientoInterno from './components/MovimientoInterno/MovimientoInterno';
import HistorialSalida from './components/HistorialSalida/HistorialSalida';
import Posicion from './components/Posicion/Posicion';
import Agenda from './components/Utils/Agenda/Agenda';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/deposito_dw_front/" element={<Home />} />
        <Route exact path="/deposito_dw_front/remito" element={<Remito />} />
        <Route exact path="/deposito_dw_front/cuarentena" element={<Cuarentena />} />
        <Route exact path="/deposito_dw_front/descripcion-posicion/:id" element={<Posicion />} /> {/* Ruta con el parámetro id */}
        <Route exact path="/deposito_dw_front/historial-salida" element={<HistorialSalida />} /> {/* Ruta con el parámetro id */}
        <Route exact path="/deposito_dw_front/salidas" element={<Salida />} />
        <Route exact path="/deposito_dw_front/movimiento-interno" element={<MovimientoInterno />} />
        <Route exact path="/deposito_dw_front/nuevoitem" element={<NuevoItem />} />
        {/* <Route exact path="/deposito_dw_front/nuevoproveedor" element={<NuevoProveedor />} /> */}
        <Route exact path="/deposito_dw_front/agenda" element={<Agenda />} />
        {/* <Route path="*" element={<Error404 />} /> */}

      </Routes>
    </div>
  );
}
export default App;