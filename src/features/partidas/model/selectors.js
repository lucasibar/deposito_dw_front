export const selectPartidas = (state) => state.partidas?.partidas || [];
export const selectStatus = (state) => state.partidas.status;
export const selectError = (state) => state.partidas.error;
export const selectSearchTerm = (state) => state.partidas.searchTerm; 