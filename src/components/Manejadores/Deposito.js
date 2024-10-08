import React from 'react';
import { Paper, Button, Typography, Grid } from '@mui/material';
import './Deposito.css';

const racks = Array.from({ length: 20 }, (_, i) => i + 1);
const filas = Array.from({ length: 14 }, (_, i) => i + 1);

const Deposito = () => {
  return (
    <div className="deposito">
      {racks.map((rack) => (
        <Paper key={rack} elevation={3} className="rack-paper">
          <Typography variant="h6" gutterBottom>
            Rack {rack}
          </Typography>
          <Grid container spacing={2} justifyContent="center" className="botones-grid">
            {filas.map((fila) => (
              <Grid item key={`fila-${fila}`}>
                <button
                  variant="outlined"
                  className="posicion-boton"
                  onClick={() => alert(`Rack: ${rack}, Fila: ${fila}`)}
                >
                  {fila}
                </button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default Deposito;