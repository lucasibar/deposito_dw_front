import { createSlice } from '@reduxjs/toolkit';
import { fetchArticulos, addYarnComposition, updateOrCreateComposiciones } from '../../api/articulosApi';

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
      })
      .addCase(updateOrCreateComposiciones.fulfilled, (state, action) => {
        // Update the composiciones in the corresponding articulo
        const updatedComposiciones = action.payload;
        const articuloId = updatedComposiciones[0]?.articulo?.id;
        
        if (articuloId) {
          const articuloIndex = state.articulosConComposicion.findIndex(a => a.id === articuloId);
          if (articuloIndex !== -1) {
            state.articulosConComposicion[articuloIndex].composicionHilado = updatedComposiciones;
          }
        }
      })
      .addCase(updateOrCreateComposiciones.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const articulosReducer = articulosSlice.reducer;
export default articulosReducer; 