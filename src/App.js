import React from 'react';
import { Route, Routes } from "react-router-dom";
// import Login from './components/Login/Login'
import DetalleRemito from './components/Remito/DetalleRemito/DetalleRemito'
import Remito from './components/Remito/Remito'
import NuevoItem from './components/NuevoItem/NuevoItem'
import LandingPage from './components/LandyngPage/LandingPage'
import Cuarentena from './components/Cuarentena/Cuarentena'
import Stock from './components/Stock/Stock'
import ControlStock from './components/Stock/ControlStock/ControlStock';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route 
        exact  
        path="/deposito_dw_front/remito"
        element={<Remito />}
      /> 
      <Route 
        exact  
        path="//deposito_dw_front/detalleremito"
        element={<DetalleRemito />}
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
        path="/deposito_dw_front/controlstock"
        element={<ControlStock />}
      /> 
    
      <Route 
        exact  
        path="/deposito_dw_front/nuevoitem"
        element={<NuevoItem />}
      /> 
      <Route 
        exact  
        path="/deposito_dw_front/"
        element={<LandingPage />}
      /> 
 
      </Routes>
    </div>
  )
}

export default App;