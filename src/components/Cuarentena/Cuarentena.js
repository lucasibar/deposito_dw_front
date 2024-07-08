import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Cuarentena.css'
import { stockerCaja } from '../../redux/actions'

export default function ListaCajasRemito() {
  let dispatch= useDispatch()
  const cajas = useSelector((state) => state.cajasCuarentena);

  const [rack, setRack] = useState("")
  const [fila, setFila] = useState(0)
  const [piso, setPiso] = useState("")
  
  
  
  
  function guardarEnStock(caja){
    console.log(caja, "archivo de cuarentena linea 16 por ahora")
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
          <h4>{caja.identificador}</h4>
        </div>
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