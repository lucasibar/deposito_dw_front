import { createSlice } from '@reduxjs/toolkit';
import { fetchArticulos, addYarnComposition } from '../../api/articulosApi';

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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticulos.fulfilled, (state, action) => {
        console.log(action.payload, "QUEEEEEE")
        state.isLoading = false;
        state.articulosSinComposicion = action.payload.filter(articulo => articulo.composicionHilado.length === 0);
        state.articulosConComposicion = action.payload.filter(articulo => articulo.composicionHilado.length > 0);
        state.articulosInactivos = action.payload.filter(articulo => articulo.activo === false);
      })
      .addCase(fetchArticulos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addYarnComposition.fulfilled, (state, action) => {
        const updatedArticulo = action.payload;
        state.articulosSinComposicion = state.articulosSinComposicion.filter(
          articulo => articulo.id !== updatedArticulo.id
        );
        state.articulosConComposicion.push(updatedArticulo);
      })
      .addCase(addYarnComposition.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const articulosReducer = articulosSlice.reducer;
export default articulosReducer; 