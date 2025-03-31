export const selectArticulosAsignados = (state) => state.planProduccion.articulosAsignados;
export const selectArticulosProducidos = (state) => state.planProduccion.articulosProducidos;
export const selectHiladoNecesario = (state) => state.planProduccion.hiladoNecesario;
export const selectHiladoAUtilizar = (state) => state.planProduccion.hiladoAUtilizar;
export const selectIsLoading = (state) => state.planProduccion.isLoading;
export const selectError = (state) => state.planProduccion.error; 