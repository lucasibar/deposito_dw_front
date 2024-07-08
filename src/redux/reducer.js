import {
  DATA_LOAD,
  AGREGAR_CAJA,
  AGREGAR_CAJA_CUARENTENA,
  STOCKEAR_CAJA
  } from './actions'

const initialState = { 
  items: [], 
  proveedores:[{name:"Rontaltex", id: 1}, {name:"Galfione", id: 2}],
  cajas: [],
  cajasCuarentena: [],
  cajasStockeadas:[]
  }

  const rootReducer = (state = initialState, action) => {
    switch(action.type) {
      case DATA_LOAD:
        console.log(state)   
      return{         
          ...state,
         items: action.payload
      }

      case AGREGAR_CAJA:   
      return{         
          ...state,
         cajas: [...state.cajas, action.payload]
      }
      case AGREGAR_CAJA_CUARENTENA:   
      return{         
          ...state,
         cajasCuarentena: [...state.cajasCuarentena, ...state.cajas],
      }


      case STOCKEAR_CAJA:   
      return{         
          ...state,
         cajas: state.cajasCuarentena.filter(caja=> caja.identificador!==action.payload.identificador),
         cajasStockeadas:[...state.cajasStockeadas, action.payload]
      }

        default: return state
  };
  };

  export default rootReducer;