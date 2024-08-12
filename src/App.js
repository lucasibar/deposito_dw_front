import React from 'react';
import { Route, Routes } from "react-router-dom";
// import Login from './components/Login/Login'
import Remito from './components/Remito/Remito'
import NuevoItem from './components/NuevoItem/NuevoItem'
import LandingPage from './components/LandyngPage/LandingPage'
import Cuarentena from './components/Cuarentena/Cuarentena'
import Stock from './components/Stock/Stock'
import Salidas from './components/Salidas/Salidas';
import MovimientoInterno from './components/MovimientoInterno/MovimientoInterno';
import AsignarPosicionAEntrada from './components/AsignarPosicionAEntrada/AsignarPosicionAEntrada';
import Posiciones from './components/Posiciones/Posiciones';


function App() {
  return (
    <div className="App">
      <Routes>

      <Route 
        exact  
        path="/deposito_dw_front/"
        element={<LandingPage />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/posiciones"
        element={<Posiciones />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/remito"
        element={<Remito />}
      /> 
       <Route 
        exact  
        path="/deposito_dw_front/asignar-posicion"
        element={<AsignarPosicionAEntrada />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/cuarentena"
        element={<Cuarentena />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/stock"
        element={<Stock />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/salidas"
        element={<Salidas />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/movimiento-interno"
        element={<MovimientoInterno />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/nuevoitem"
        element={<NuevoItem />}
      /> 
 
      </Routes>
    </div>
  )
}

export default App;