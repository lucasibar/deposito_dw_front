import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { setRackFila } from '../../../../redux/actions';


export default function ManejadoresPosiciones() {
  const dispatch = useDispatch();
  const racks=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
  const filas=[1,2,3,4,5,6,7,8,9,10,11,12,13,14]
  
  const [rack, setRack] = useState("");
  const [fila, setFila] = useState("");

  useEffect(() => {
    dispatch(setRackFila(rack, fila))
  }, [rack, fila]);
  const handleRackChange = (event) => setRack(event.target.value);
  const handleFilaChange = (event) => setFila(event.target.value);

  return (
    <Box sx={{ padding: 2 }}>
     
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Rack</InputLabel>
            <Select value={rack} onChange={handleRackChange}>
              {racks?.map((rak, i) => (
                <MenuItem key={i} value={rak}>{rak}</MenuItem>
              ))}
              <MenuItem key={"a"} value={""}>TODOS</MenuItem>
            </Select>
          </FormControl>
        </Grid>



        <Grid item xs={12} sm={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Fila</InputLabel>
            <Select value={fila} onChange={handleFilaChange}>
            {filas?.map((fil, i) => (
                <MenuItem key={i} value={fil}>{fil}</MenuItem>
              ))}
              <MenuItem key={"a"} value={""}>TODOS</MenuItem>
            </Select>
          </FormControl>
        </Grid>



        <Grid item xs={12} sm={12} md={4}>
          <FormControl disabled fullWidth>
            <InputLabel>Depósito</InputLabel>
            <Select >
              
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}