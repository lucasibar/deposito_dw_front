import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import './DetalleRemito.css';





export default function DetalleRemito() {
  let dispatch = useDispatch()  
  const [remito, setRemito] = useState(null);
    const [proveedor, setProveedor] = useState("Rontaltex");

  const [itemsRemito, setItemsRemito] = useState([]);
  const cajas = useSelector((state) => state.cajasCuarentena);

  const groupAndSumItems = (items) => {
        const groupedItems = items.reduce((acc, item) => {
            const { descripcionItem, kilos } = item;
            if (!acc[descripcionItem]) {
                acc[descripcionItem] = { ...item, kilos: 0 };
            }
            acc[descripcionItem].kilos += parseFloat(kilos) || 0;
            
            return acc;
        }, {});
        
        return Object.values(groupedItems);
    };

    useEffect(()=>{
        let listaSum = groupAndSumItems(cajas)
        setItemsRemito(listaSum)
    },[cajas])
    

    const navigate = useNavigate();
    function remitoAprobado(){
      navigate('/deposito_dw_front/');
    }


    
  return (
    <div style={{width:'100%'}}>
      <AppBar position="static">
        <Toolbar className="toolbar">
          <Typography variant="h6" color="inherit" component="div" className="left">
            Remito {remito ? `${remito}` : "00000"}
          </Typography>
          <Typography variant="h6" color="inherit" component="div" className="right">
            {proveedor}
          </Typography>
        </Toolbar>
      </AppBar>


        {itemsRemito?.map((item, i) => 
        <div key={i}>
        <h5>{item.descripcionItem}</h5>
        <h5>{item.kilos}</h5>
        </div>
        
        )}


        <Button onClick={remitoAprobado} sx={{ width: '350px', mt: '30px'}} variant="contained">SUBIR REMITO</Button>

    </div>
  );
}