// src/components/Agenda.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { addTarea, fetchTareas, completeTarea } from '../../../redux/actions';

const Agenda = () => {
  const dispatch = useDispatch();
  const tareas = useSelector((state) => state.tareas);
  const [tarea, setTarea] = React.useState('');
  const [isPriority, setIsPriority] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTareas());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTarea = { descripcion: tarea, estado: 'to do', prioritario: isPriority };
    dispatch(addTarea(newTarea));
    setTarea('');
    setIsPriority(false);
  };

  const handleComplete = (id) => {
    dispatch(completeTarea(id));
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Agenda
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nueva Tarea"
          variant="outlined"
          fullWidth
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
            />
          }
          label="Prioritario"
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Tarea
        </Button>
      </form>
      
      
      
      
      <List>
        {tareas.map((t) =>
          t.status !== 'completed' ? (
            <ListItem key={t.id}>
              <ListItemText primary={t.descripcion} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleComplete(t.id)}
                >
                  Completar
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ) : null
        )}
      </List>
    </Paper>
  );
};

export default Agenda;