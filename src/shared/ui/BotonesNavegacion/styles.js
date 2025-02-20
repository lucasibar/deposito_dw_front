export const buttonStyles = {
  active: {
    width: 12,
    height: 12,
    backgroundColor: 'blue',
    border: '2px solid blue',
    borderRadius: '50%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: 'blue',
    },
    pointerEvents: 'none',
  },
  inactive: {
    width: 12,
    height: 12,
    backgroundColor: 'lightgray',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
}; 