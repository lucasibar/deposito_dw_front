import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Cuarentena.css'
import { stockerCaja } from '../../redux/actions'
import Barcode from 'react-barcode';

export default function ListaCajasRemito() {
  let dispatch= useDispatch()
  const cajas = useSelector((state) => state.cajasCuarentena);

  const [rack, setRack] = useState("")
  const [fila, setFila] = useState("")
  const [piso, setPiso] = useState("")
  
  
  
  
  function guardarEnStock(caja){
    dispatch(stockerCaja(caja))
  }



  function handleRack(e){
    const rackNumber = e.target.value;
    setRack(rackNumber);
  }
  function handleFila(e){
    const filaNumber = e.target.value;
    setFila(filaNumber);
  }
  function handlePiso(e){
    const pisoNumber = e.target.value;
    setPiso(pisoNumber)
  }
  
  return (
    <div className='cajaContenedor'>
      {cajas?.map((caja, i) => 
        <>
        <div key={i} className='caja'>
          <h4>{caja.descripcionItem}</h4>
        </div>
          <Barcode
          value={caja.identificador}
          displayValue={false}
          lineColor="#990000"
        />
          <h2>{caja.identificador}</h2>
        <TextField
              id="outlined-multiline-flexible"
              label="Rack"
              multiline
              value={rack}
              onChange={handleRack}
              // maxRows={4}
            />
        <TextField
              id="outlined-multiline-flexible"
              label="Piso"
              multiline
              value={piso}
              onChange={handlePiso}
              // maxRows={4}
            />
                    <TextField
              id="outlined-multiline-flexible"
              label="Fila"
              multiline
              value={fila}
              onChange={handleFila}
              // maxRows={4}
            />
        
        <Button onClick={() => guardarEnStock(caja)} sx={{ width: '350px', mt: '30px'}} variant="contained">GUARDAR</Button>
        </>
    
      )}
    </div>
  );
}