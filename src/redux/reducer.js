import {
  DATA_LOAD,
  AGREGAR_ITEM,
  DATA_BASE_REMITO,
  LIMPIAR_DATOS_BASE_REMITO,
  AGREGAR_PARTIDA_AL_REMITO,
  SUBIR_DATA_REMITO,
  PARTIDAS_SIN_PALLET_ASIGNADO,
  GET_PARTIDAS,
  AGREGAR_PALLET_A_LISTA_PARA_SUBIR,
  SUBMIT_PALLETS,
  STOCK_ITEM_SELECCIONADO,
  ELIMINAR_PARTIDA_AL_REMITO,
  PARTIDAS_EN_CUARENTENA,
  AGREGAR_KILOS_DE_PARTIDA_A_POSICION,
  ELIMINAR_KILOS_ASIGNADOS_A_POSICION
} from './actions';

const initialState = { 
//----Para eliminar-------------
  pallets: [],
  stockItemSeleccionado: [],
//------------------------------
  items: [], 
  numeroRemito: 0,
//---------------
  proveedor: "",
  fechaRemito: "",
//---------------
  partidasRemito: [],
  partidas: [],
//1---------------
    partidasDeEntradaAPosicion:[],
//2---------------
  partidasCuarentena:[],




};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
//1----------------------------------------------------------------------------------
    case AGREGAR_KILOS_DE_PARTIDA_A_POSICION:   
    return {         
      ...state,
      partidasDeEntradaAPosicion: [ ...state.partidasDeEntradaAPosicion, action.payload]
    };
    case ELIMINAR_KILOS_ASIGNADOS_A_POSICION:   
      return {         
        ...state,
        partidasDeEntradaAPosicion: state.partidasDeEntradaAPosicion.filter(p => p!== action.payload)
      };



//2----------------------------------------------------------------------------------
    case PARTIDAS_EN_CUARENTENA:   
    return {         
      ...state,
      partidasCuarentena: action.payload
    };
    
    




    

//-------------------------------------------------------
    case STOCK_ITEM_SELECCIONADO:   
      return {         
        ...state,
        stockItemSeleccionado: action.payload
      };

    case DATA_LOAD:
      return {         
        ...state,
        items: action.payload
      };

    case SUBMIT_PALLETS:
      return {         
        ...state,
        pallets: []
      };

    case AGREGAR_PALLET_A_LISTA_PARA_SUBIR:
      return {
        ...state,
        pallets: [...state.pallets, action.payload]
      };

    case DATA_BASE_REMITO:
      return {         
        ...state,
        numeroRemito: action.payload.numeroRemito,
        proveedor: action.payload.proveedor,
        fechaRemito: action.payload.fecha
      };

    case AGREGAR_PARTIDA_AL_REMITO:   
      return {         
        ...state,
        partidasRemito: [...state.partidasRemito, action.payload]
      };

    case LIMPIAR_DATOS_BASE_REMITO:
      return {         
        ...state,
        proveedor: "",
        numeroRemito: ""
      };

    case AGREGAR_ITEM:   
      return {         
        ...state,
        items: [...state.items, action.payload]
      };

    case SUBIR_DATA_REMITO:
      return {         
        ...state,
        partidas: action.payload
      };

    case GET_PARTIDAS:
      return {         
        ...state,
        partidas: action.payload
      };

    case PARTIDAS_SIN_PALLET_ASIGNADO:
      return state;

    case ELIMINAR_PARTIDA_AL_REMITO:   
      return {         
        ...state,
        partidasRemito: state.partidasRemito.filter(p => p.numeroPartida !== action.payload)
      };

    default: 
      return state;
  }
};

export default rootReducer;