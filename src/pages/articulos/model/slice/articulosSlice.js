import { createSlice } from '@reduxjs/toolkit';
import { fetchArticulos } from '../../api/articulosApi';

const initialState = {
  articulosSinComposicion: [],
  articulosConComposicion: [],
  articulosInactivos: [],
  isLoading: false,
  error: null
};

const articulosSlice = createSlice({
  name: 'articulos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticulos.pending, (state) => {
        console.log('Loading started'); // Debug
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticulos.fulfilled, (state, action) => {
        console.log('Success payload:', action.payload); // Debug
        state.isLoading = false;
        state.articulosSinComposicion = action.payload.articulosSinComposicion || [];
        state.articulosConComposicion = action.payload.articulosConComposicion || [];
        state.articulosInactivos = action.payload.articulosInactivos || [];
      })
      .addCase(fetchArticulos.rejected, (state, action) => {
        console.log('Error:', action.error); // Debug
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const articulosReducer = articulosSlice.reducer;
export default articulosReducer; 