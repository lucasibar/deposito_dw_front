import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articulosAsignados: [],
  articulosProducidos: [],
  hiladoNecesario: [],
  hiladoAUtilizar: [],
  isLoading: false,
  error: null
};

const planProduccionSlice = createSlice({
  name: 'planProduccion',
  initialState,
  reducers: {
    setArticulosAsignados: (state, action) => {
      state.articulosAsignados = action.payload;
    },
    setArticulosProducidos: (state, action) => {
      state.articulosProducidos = action.payload;
    },
    setHiladoNecesario: (state, action) => {
      state.hiladoNecesario = action.payload;
    },
    setHiladoAUtilizar: (state, action) => {
      state.hiladoAUtilizar = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setArticulosAsignados,
  setArticulosProducidos,
  setHiladoNecesario,
  setHiladoAUtilizar,
  setLoading,
  setError
} = planProduccionSlice.actions;

export const planProduccionReducer = planProduccionSlice.reducer;
export default planProduccionReducer; 