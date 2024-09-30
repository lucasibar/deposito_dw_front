import {
  LOAD_PROVEEDORES,
  NUEVO_PROVEEDOR,
  ITEMS_POR_PROVEEDOR_SELECCIONADO,
  AGREGAR_PARTIDA_AL_REMITO,
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------

  DATA_LOAD_REMITO,
  AGREGAR_ITEM,
  DATA_BASE_REMITO,
  LIMPIAR_DATOS_BASE_REMITO,
  SUBIR_DATA_REMITO,
  PARTIDAS_SIN_PALLET_ASIGNADO,
  GET_PARTIDAS,
  AGREGAR_PALLET_A_LISTA_PARA_SUBIR,
  SUBMIT_PALLETS,
  STOCK_ITEM_SELECCIONADO,
  ELIMINAR_PARTIDA_AL_REMITO,
  PARTIDAS_EN_CUARENTENA,
  AGREGAR_KILOS_DE_PARTIDA_A_POSICION,
  ELIMINAR_KILOS_ASIGNADOS_A_POSICION,
  STOCK_ITEM_POSICION,
  LIMPIAR_ESTADO_REDUCER,
  AGREGAR_AL_REMITO_SALIDA,
  ELIMINAR_PARTIDA_AL_REMITO_SALIDA,
  AGREGAR_PROVEEDOR,
} from './actions';

const initialState = { 
  proveedores: [], 
  proveedor: "",
  itemsSegunProveedor:[],



//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------

  pallets: [],
  stockItemSeleccionado: [],
  items: [], 
  numeroRemito: 0,
  fechaRemito: "",
  partidasRemito: [],
  partidas: [],
    partidasDeEntradaAPosicion:[],
  partidasCuarentena:[],
  partidasPorPosicion:[],
  proximaPartidaConsumo:0,
partidasRemitoSalida:[]


};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_PROVEEDORES:   
    return {         
      ...state,
      proveedores: action.payload
    };
    case NUEVO_PROVEEDOR:   
    return {         
      ...state,
      proveedores: [...state.proveedores, action.payload],

    };
    case ITEMS_POR_PROVEEDOR_SELECCIONADO:  
    return {         
      ...state,
      proveedor: action.payload.proveedor,
      itemsSegunProveedor:[action.payload.data]
    };
    case AGREGAR_PARTIDA_AL_REMITO:   
      return {         
        ...state,
        partidasRemito: [...state.partidasRemito, action.payload]
      };


//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------




    case AGREGAR_AL_REMITO_SALIDA:   
    return {         
      ...state,
      partidasRemitoSalida: [...state.partidasRemitoSalida, action.payload]
    };

    case ELIMINAR_PARTIDA_AL_REMITO_SALIDA:   
      return {         
        ...state,
        partidasRemitoSalida: state.partidasRemitoSalida.filter(p => p.posicion !== action.posicion)
      };



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
    
//3----------------------------------------------------------------------------------    
    case STOCK_ITEM_POSICION:   
    return {         
      ...state,
      partidasPorPosicion: action.payload
    };

//4-------------------------------------------------------

case STOCK_ITEM_SELECCIONADO: 
  const numerosDePartida = Object.values(action.payload)
  .flatMap(posicion => Object.values(posicion.partidas).map(partida => partida.partida.numeroPartida));

  const numeroDePartidaMasChico = Math.min(...numerosDePartida);
  return {         
    ...state,
    stockItemSeleccionado: action.payload,
    proximaPartidaConsumo:numeroDePartidaMasChico
  };
//-------------------------------------------------------


case LIMPIAR_ESTADO_REDUCER:   
return initialState

    case DATA_LOAD_REMITO:
      return {         
        ...state,
        items: action.payload.items,
        proveedores: action.payload.proveedores
      };

    case SUBMIT_PALLETS:
      return {         
        ...state,
        pallets: []
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
        proveedores: action.payload.proveedor,
        fechaRemito: action.payload.fecha
      };

      case AGREGAR_PROVEEDOR:
        return {         
          ...state,
          proveedores: [...state.proveedores, action.payload.proveedor],
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