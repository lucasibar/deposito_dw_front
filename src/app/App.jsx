import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { CuarentenaWidget } from '../widgets/cuarentena/CuarentenaWidget';
import { HistorialWidget } from '../widgets/historial/HistorialWidget';
import { PosicionWidget } from '../widgets/posicion/PosicionWidget';
import { HiladoWidget } from '../widgets/hilado/HiladoWidget';
import { Login } from '../features/auth/ui/Login';
import { CalidadPage } from '../pages/calidad/CalidadPage';
import { StockPage } from '../pages/stock/StockPage';
import { Stock2Page } from '../pages/stock2/Stock2Page';
import { PosicionesPage } from '../pages/posiciones/PosicionesPage';
import { ConsumosPage } from '../pages/consumos/ConsumosPage';
import { RemitoEntradaInsumosPage } from '../pages/remito-entrada-insumos/RemitoEntradaInsumosPage';
import ProduccionDiariaPage from '../pages/produccion-diaria';
import EtiquetasPage from '../pages/etiquetas';
import { OrdenPedidoPage } from '../pages/orden-pedido/OrdenPedidoPage';
import { ArticulosPage } from '../pages/articulos/ArticulosPage';
import { PlanProduccionPage } from '../pages/plan-produccion/PlanProduccionPage';
import { MatchLotePOPage } from '../pages/match-lote-po/MatchLotePOPage';
import { MatchLoteStockPage } from '../pages/match-lote-stock/MatchLoteStockPage';
//que onda quiero ver si funciona 
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
        <Route path="/deposito_dw_front/stock2" element={<Stock2Page />} />
        <Route path="/deposito_dw_front/posiciones" element={<PosicionesPage />} />
        <Route path="/deposito_dw_front/consumos" element={<ConsumosPage />} />
        <Route path="/deposito_dw_front/produccion-diaria" element={<ProduccionDiariaPage />} />
        <Route path="/deposito_dw_front/etiquetas" element={<EtiquetasPage />} />
        <Route path="/deposito_dw_front/orden-pedido" element={<OrdenPedidoPage />} />
        <Route path="/deposito_dw_front/articulos" element={<ArticulosPage />} />
        <Route path="/deposito_dw_front/plan-produccion" element={<PlanProduccionPage />} />
        <Route path="/deposito_dw_front/match-lote-po" element={<MatchLotePOPage />} />
        <Route path="/deposito_dw_front/match-lote-stock" element={<MatchLoteStockPage />} />
        <Route exact path="/deposito_dw_front/" element={<Login />} />
        <Route path="*" element={<Navigate to="/deposito_dw_front/" replace />} />
      </Routes>
    </div>
  );
}; 