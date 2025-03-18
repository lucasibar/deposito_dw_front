export const normalizeText = (text) => {
  return text?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const getWeekRange = (fecha) => {
  // ... código existente
}; 