import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { movimientoPosicion1Posicion2 } from '../../redux/actions';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NavBar from '../NavBar/NavBar';

const initialStatePartida = {
  kilos: "",
  numeroPartida: "",
  unidades: "",
  fecha: ""
};

const initialStatePosicion = {
  rack: "",
  fila: "",
  AB: "",
  pasillo: ""
};

export default function MovimientoInterno() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.items);
  
  const [itemsDescripciones, setItemsDescripciones] = useState([]);
  const [item, setItem] = useState('');
  const [partida, setPartida] = useState(initialStatePartida);
  const [posicion1, setPosicion1] = useState(initialStatePosicion);
  const [posicion2, setPosicion2] = useState(initialStatePosicion);
  // const [proveedor, setProveedor] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      setItemsDescripciones(items.map((item) => item.descripcion));
    }
  }, [items]);

  const handleChange = (setter) => (e) => setter(e.target.value);

  const limpiar = () => {
    setPartida(initialStatePartida);
    // setProveedor("");
    setPosicion1(initialStatePosicion);
    setPosicion2(initialStatePosicion);
  };

  const subirPartida = async () => {
    const partidaCompleta = {
      ...partida,
      descripcionItem: item
    };
    dispatch(movimientoPosicion1Posicion2({ partida: partidaCompleta, posicion1, posicion2 }));
  };

  return (
    <>
    <NavBar titulo="Movimiento interno" />

    <div className='formConteiner'>
      <Typography variant="h6" component="h2">Item</Typography>
      {/* <TextField
        label="Proveedor"
        value={proveedor}
        onChange={handleChange(setProveedor)}
        sx={{ width: '350px', marginTop: '10px' }}
      /> */}
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel>Descripcion Item</InputLabel>
        <Select value={item} onChange={handleChange(setItem)}>
          {itemsDescripciones.map((descripcion, i) => (
            <MenuItem key={i} value={descripcion}>{descripcion}</MenuItem>
          ))}
          <Button onClick={() => navigate('/deposito_dw_front/nuevoitem')} style={{ color: "blue" }}>
            Agregar item nuevo
          </Button>
        </Select>
      </FormControl>
      {[
        { label: "Numero de partida", value: partida.numeroPartida, onChange: handleChange((value) => setPartida({ ...partida, numeroPartida: parseInt(value) })) },
        { label: "Kilos", value: partida.kilos, onChange: handleChange((value) => setPartida({ ...partida, kilos: parseInt(value) })) },
        { label: "Unidades", value: partida.unidades, onChange: handleChange((value) => setPartida({ ...partida, unidades: parseInt(value) })) },
        { label: "Fecha", value: partida.fecha, onChange: handleChange((value) => setPartida({ ...partida, fecha: value })), type: "date", InputLabelProps: { shrink: true } },
      ].map((field, index) => (
        <TextField
          key={index}
          fullWidth
          margin="normal"
          label={field.label}
          value={field.value}
          onChange={field.onChange}
          type={field.type || "text"}
          InputLabelProps={field.InputLabelProps || {}}
          sx={{ width: '350px', marginTop: '10px' }}
        />
      ))}
      
      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="h6" component="h2">Posición 1</Typography>

      {[
        { label: "Pasillo", value: posicion1.pasillo, onChange: handleChange((value) => setPosicion1({ ...posicion1, pasillo: parseInt(value) })) },
        { label: "Rack", value: posicion1.rack, onChange: handleChange((value) => setPosicion1({ ...posicion1, rack: parseInt(value) })) },
        { label: "Fila", value: posicion1.fila, onChange: handleChange((value) => setPosicion1({ ...posicion1, fila: parseInt(value) })) },
      ].map((field, index) => (
        <TextField
          key={index}
          fullWidth
          margin="normal"
          label={field.label}
          value={field.value}
          onChange={field.onChange}
          type={field.type || "text"}
          InputLabelProps={field.InputLabelProps || {}}
          sx={{ width: '350px', marginTop: '10px' }}
        />
      ))}
      <FormControl fullWidth margin="normal" sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel>A/B</InputLabel>
        <Select value={posicion1.AB} onChange={handleChange((value) => setPosicion1({ ...posicion1, AB: value }))}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ margin: '20px 0' }} />
      <Typography variant="h6" component="h2">Posición 2</Typography>

      {[
        { label: "Pasillo", value: posicion2.pasillo, onChange: handleChange((value) => setPosicion2({ ...posicion2, pasillo: parseInt(value) })) },
        { label: "Rack", value: posicion2.rack, onChange: handleChange((value) => setPosicion2({ ...posicion2, rack: parseInt(value) })) },
        { label: "Fila", value: posicion2.fila, onChange: handleChange((value) => setPosicion2({ ...posicion2, fila: parseInt(value) })) },
      ].map((field, index) => (
        <TextField
          key={index}
          fullWidth
          margin="normal"
          label={field.label}
          value={field.value}
          onChange={field.onChange}
          type={field.type || "text"}
          InputLabelProps={field.InputLabelProps || {}}
          sx={{ width: '350px', marginTop: '10px' }}
        />
      ))}
      <FormControl fullWidth margin="normal" sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel>A/B</InputLabel>
        <Select value={posicion2.AB} onChange={handleChange((value) => setPosicion2({ ...posicion2, AB: value }))}>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>
      <div className='textFieldContainer'>
        <Button onClick={subirPartida} sx={{ width: '350px', mt: '30px' }} variant="outlined">MOVER PARTIDA</Button>
        <Button onClick={limpiar} sx={{ width: '350px', mt: '30px' }} variant="outlined">LIMPIAR</Button>
      </div>
    </div>
    </>
  );
}