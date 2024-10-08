import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './DetalleAjuste.css';
import { agragarPartidaAlRemito } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';

export default function DetalleAjuste() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items);
  
  const [item, setItem] = useState("");
  const [itemsDescripciones, setItemsDescripciones] = useState([]);

  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items]);

  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItem(itemSeleccionado);
  };

  const [ajuste, setAjuste] = useState({
    kilos: "",
    unidades: "",
  });

  const handleInputChange = (field) => (e) => {
    setAjuste({ ...ajuste, [field]: e.target.value });
  };

  
  
  
  
  
  const initialStatePosicion= {
    rack:"",
    fila:"",
    AB:"",
    pasillo:""
  }
  const [posicion, setPosicion] = useState(initialStatePosicion);
  function handleRack(e) {
    const rack = e.target.value;
    setPosicion(state => ({
      ...state,
      rack: parseInt(rack) 
    }));
  }
  function handleFila(e) {
    const fila = e.target.value;
    setPosicion(state => ({
      ...state,
      fila: parseInt(fila) 
    }));
  }
  function handleAB(e) {
    const ab = e.target.value;
    setPosicion(state => ({
      ...state,
      AB: ab 
    }));
  }
  function handlePasillo(e) {
    const pasillo = e.target.value;
    setPosicion(state => ({
      ...state,
      pasillo: parseInt(pasillo) 
    }));
  }
  
  
  
  
  
  
  const limpiar = () => {
    setAjuste({ kilos: "", unidades: "" });
    setPosicion(initialStatePosicion)
  };
  
  return (
    <div className="formContainer">
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item}
          onChange={handleChange}
        >
          {itemsDescripciones?.map((itm, i) => (
            <MenuItem key={i} value={itm}>{itm}</MenuItem>
          ))}
        <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue", marginTop: '10px' }}>
          Agregar item nuevo
        </Button>
        </Select>
      </FormControl>
      
      <TextField
        id="outlined-multiline-flexible"
        label="Kilos"
        multiline
        value={ajuste.kilos}
        onChange={handleInputChange('kilos')}
        sx={{ width: '350px', marginTop: '10px' }}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Unidades"
        multiline
        value={ajuste.unidades}
        onChange={handleInputChange('unidades')}
        sx={{ width: '350px', marginTop: '10px' }}
      />




      
<TextField
        fullWidth
        margin="normal"
        label="Pasillo"
        type="number"
        value={posicion.pasillo}
        onChange={handlePasillo}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <TextField
        fullWidth
        margin="normal"
        label="Rack"
        type="number"
        value={posicion.rack}
        onChange={handleRack}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <TextField
        fullWidth
        margin="normal"
        label="Fila"
        type="number"
        value={posicion.fila}
        onChange={handleFila}
        required
        sx={{width: '350px', marginTop:'10px'}} 
      />
      <FormControl fullWidth margin="normal"  sx={{width: '350px', marginTop:'10px'}} >
        <InputLabel id="position-ab-label">A/B</InputLabel>
        <Select
          labelId="position-ab-label"
          id="position-ab-select"
          value={posicion.AB}
          onChange={handleAB}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>
      
      <div className='textFieldContainer'>
      {/* <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px' }} variant="outlined">AGREGAR MERCADERIA</Button>
      <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px' }} variant="outlined">RESTAR MERCADERIA</Button>*/}
      <Button onClick={limpiar} sx={{ width: '350px', mt: '30px' }} variant="outlined">LIMPIAR</Button> 
      </div>
    </div>
  );
}