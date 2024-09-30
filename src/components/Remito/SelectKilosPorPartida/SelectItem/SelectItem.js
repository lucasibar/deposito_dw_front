import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InputLabel, MenuItem, FormControl, Select, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function SelectItem({cargarRegistroItem}) {
  const navigate = useNavigate();
 
  const itemsSegunProveedor = useSelector((state) => state.itemsSegunProveedor)

  const [itemSeleccionado, setItemSeleccionado] = useState({}); 
  const handleChangeItem = (e) => {
    setItemSeleccionado(e.target.value);
  };
  
  useEffect(()=>{
    cargarRegistroItem(itemSeleccionado)
  },[itemSeleccionado])


    return (
      <div className="remito-form-container">
      <FormControl className="descripcion-item">
        <InputLabel id="item-label">Descripción Item</InputLabel>
        <Select
          labelId="item-label"
          id="item"
          value={itemSeleccionado}
          onChange={handleChangeItem}
        >
          {itemsSegunProveedor?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm.descripcion}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>
    
      </div>
  );
}