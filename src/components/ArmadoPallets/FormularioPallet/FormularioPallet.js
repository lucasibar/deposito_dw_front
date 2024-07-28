import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function FormularioPallet({ onAddPallet, partidas }) {
  const items = useSelector((state) => state.items);
  const [itemsDescripciones, setItemsDescripciones] = useState([]); 
  useEffect(() => {
    if (items.length > 0) {
      const descripcionItems = items.map((item) => item.descripcion);
      setItemsDescripciones(descripcionItems);
    }
  }, [items, setItemsDescripciones]);

  const [selectedPartida, setSelectedPartida] = useState(0);
  const [kilos, setKilos] = useState(0);
  const [unidades, setUnidades] = useState(0);
  const [fecha, setFecha] = useState('');
  const [numeroPallet, setNumeroPallet] = useState(0);
  const [rack, setRack] = useState('');
  const [fila, setFila] = useState('');
  const [positionAB, setPositionAB] = useState('A');
  const [pasillo, setPasillo] = useState(false);

  const [itemSelected, setItemSelected] = useState("");

  const handleChange = (e) => {
    const itemSeleccionado = e.target.value;
    setItemSelected(itemSeleccionado);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kilos: parseFloat(kilos),
      unidades: parseInt(unidades),
      numeroPartida: parseInt(selectedPartida),
      idItem: itemSelected,
      fecha: fecha,
      numeroPallet: numeroPallet,
      rack: pasillo ? null : rack,
      fila: pasillo ? null : fila,
      positionAB: pasillo ? null : positionAB,
      pasillo: pasillo,
    };
    onAddPallet(data);
    setKilos(0);
    setUnidades(0);
    setSelectedPartida(0);
    setFecha('');
    setNumeroPallet(0);
    setRack(0);
    setFila(0);
    setPositionAB('A');
    setPasillo(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <FormControl sx={{ width: '350px', marginTop: '10px' }}>
        <InputLabel id="demo-simple-select-label">Descripcion Item</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemSelected}
          onChange={handleChange}
        >
          {itemsDescripciones?.map((item, i) => (
            <MenuItem key={i} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Número de Partida"
        type="number"
        value={selectedPartida}
        onChange={(e) => setSelectedPartida(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Kilos"
        type="number"
        value={kilos}
        onChange={(e) => setKilos(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Unidades"
        type="number"
        value={unidades}
        onChange={(e) => setUnidades(e.target.value)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Número de Pallet"
        type="number"
        value={numeroPallet}
        onChange={(e) => setNumeroPallet(e.target.value)}
        required
      />
      <FormControlLabel
        control={<Checkbox checked={pasillo} onChange={(e) => setPasillo(e.target.checked)} />}
        label="Pasillo"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Rack"
        type="number"
        value={rack}
        onChange={(e) => setRack(e.target.value)}
        required
        disabled={pasillo}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Fila"
        type="number"
        value={fila}
        onChange={(e) => setFila(e.target.value)}
        required
        disabled={pasillo}
      />
      <FormControl fullWidth margin="normal" disabled={pasillo}>
        <InputLabel id="position-ab-label">A/B</InputLabel>
        <Select
          labelId="position-ab-label"
          id="position-ab-select"
          value={positionAB}
          onChange={(e) => setPositionAB(e.target.value)}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear Pallet
      </Button>
    </form>
  );
}