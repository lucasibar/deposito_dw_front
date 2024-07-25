import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


export default function NuevoPallet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const [posicion, setPosicion] = React.useState({
    fila:0,
    rack:0,
    AB:""
  });
  
  const handleFila = (e) => {
    setPosicion({
      ...posicion,
      fila: parseInt(e.target.value)
    });
  };
  const handleRack = (e) => {
    setPosicion({
      ...posicion,
      rack: parseInt(e.target.value)
    });
  };
  const handleAB = (e) => {
    setPosicion({
      ...posicion,
      AB: e.target.value
    });
  };
  


  // const [partidaElegida, setPosicion] = useState({
  //   fila:0,
  //   rack:0,
  //   AB:""
  // });
  
  // const handleFila = (e) => {
  //   setPosicion({
  //     ...posicion,
  //     fila: parseInt(e.target.value)
  //   });
  // };
  // const handleRack = (e) => {
  //   setPosicion({
  //     ...posicion,
  //     rack: parseInt(e.target.value)
  //   });
  // };







  const confirmarNuevoPallet = () => {
    console.log("aca cargo pallet a partida")
  };
  
  return (
    <div>
      <CloseIcon  onClick={()=>  navigate('/deposito_dw_front/') }/>
      {/* <TextField
        id="outlined-multiline-flexible"
        label="Numero de fila"
        multiline
        value={codigoDeBarras}
        onChange={handleCodigoDeBarras}
        // maxRows={4}
      /> */}
            <TextField
        id="outlined-multiline-flexible"
        label="Numero de fila"
        multiline
        value={posicion.fila}
        onChange={handleFila}
        // maxRows={4}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Numero de rack"
        multiline
        value={posicion.rack}
        onChange={handleRack}
        // maxRows={4}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="A o B"
        multiline
        value={posicion.AB}
        onChange={handleAB}
        // maxRows={4}
      />
      {/* <TextField
        id="outlined-multiline-flexible"
        label="Numero de rack"
        multiline
        value={numeroPartida}
        onChange={handleNumeroPartida}
        // maxRows={4}
      /> */}
      <Button
        onClick={confirmarNuevoPallet}
        sx={{ width: '350px', mt: '30px' }}
        variant="contained"
      >
       GENERAR NUEVA ETIQUETA DE PALLET
      </Button>
      </div>
      )
}