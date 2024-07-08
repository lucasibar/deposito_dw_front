import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import Remito from './components/Remito/Remito'
import LandingPage from './components/LandyngPage/LandingPage'
import Cuarentena from './components/Cuarentena/Cuarentena'


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
        path="/deposito_dw_front/cuarentena"
        element={<Cuarentena />}
      /> 
            <Route 
        exact  
        path="/deposito_dw_front/stock"
        element={<LandingPage />}
      /> 
            <Route 
        exact  
        path="/deposito_dw_front/controlStock"
        element={<LandingPage />}
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