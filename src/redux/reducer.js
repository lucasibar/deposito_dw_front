import {
  DATA_LOAD,
  AGREGAR_CAJA,
  AGREGAR_CAJA_CUARENTENA,
  STOCKEAR_CAJA,
  DATA_BASE_REMITO,
  AGREGAR_CAJA_REMITO
  } from './actions'

const initialState = { 
  items: [], 
  proveedores:[{name:"Rontaltex", id: 1}, {name:"Galfione", id: 2}],
  
  //REMITO
  numeroRemito:"",
  proveedor:"",
  cajasRemito: [],


  //CUARENTENA
  cajasCuarentena: [],

  //STOCK
  cajasStockeadas:[]
  }

  const rootReducer = (state = initialState, action) => {
    switch(action.type) {

      case DATA_LOAD:
      return{         
          ...state,
        items: action.payload
      }


      //REMITOS
      case DATA_BASE_REMITO:
      return state
      // {         
      //     ...state,
      //   numeroRemito: action.payload.numeroRemito,
      //   proveedor: action.payload.proveedor
      // }

      case AGREGAR_CAJA:   
      return{         
          ...state,
         cajasRemito: [...state.cajasRemito, action.payload]
      }
      case AGREGAR_CAJA_REMITO:   
      return{         
          ...state,
         cajasCuarentena: [...state.cajasCuarentena, ...state.cajasRemito],
      }


      case STOCKEAR_CAJA:   
      return{         
          ...state,
         cajasRemito: state.cajasCuarentena.filter(caja=> caja.identificador!==action.payload.identificador),
         cajasStockeadas:[...state.cajasStockeadas, action.payload]
      }

        default: return state
  };
  };

  export default rootReducer;