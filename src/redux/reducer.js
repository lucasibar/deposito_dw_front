import {
  AGREGAR_PROVEEDOR,
  PROVEEDOR_SELECCIONADO,
  FECHA_SELECCIONADO,
  NUMERO_REMITO_SELECCIONADO,
  GET_PROVEEDORES,
  GET_iTEMS,
  AGREGAR_ITEM,
  AGREGAR_PARTIDA_AL_REMITO,
  // DATA_LOAD,
  DATA_LOAD_REMITO,
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

  AGREGAR_NUEVO_PROVEEDOR,
} from './actions';

const initialState = { 

  itemsProveedor: [], 
  proveedores:[],
  proveedorSeleccionado: "",
  fechaSeleccionado:"",
  numeroRemitoSeleccionado: 0,
  partidasRemito: [],


//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
  pallets: [],
  stockItemSeleccionado: [],
  categoriaMercaderiaRemito:"",
  partidas: [],
  partidasDeEntradaAPosicion:[],
  partidasCuarentena:[],
  partidasPorPosicion:[],
  proximaPartidaConsumo:0,
  partidasRemitoSalida:[]


};

const rootReducer = (state = initialState, action) => {
switch (action.type) {
  case GET_PROVEEDORES:
    return {
      ...state,
      proveedores: action.payload
    };
  case GET_iTEMS:
    return {
      ...state,
      itemsProveedor: action.payload
    };
  
  case AGREGAR_PROVEEDOR:
    return {
      ...state,
      proveedores: [...state.proveedores, action.payload]
    };
  case PROVEEDOR_SELECCIONADO:
    return {
      ...state,
      proveedorSeleccionado: action.payload,
    };
  case FECHA_SELECCIONADO:
    return {
      ...state,
      fechaSeleccionado: action.payload,
    };
  case NUMERO_REMITO_SELECCIONADO:
    return {
      ...state,
      numeroRemitoSeleccionado: action.payload,
    };
  case AGREGAR_ITEM:
    return {         
      ...state,
      itemsProveedor: [...state.itemsProveedor, action.payload]
    };
  case AGREGAR_PARTIDA_AL_REMITO:   
    return {         
      ...state,
      partidasRemito: [...state.partidasRemito, action.payload]
    };

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
 
case DATA_LOAD_REMITO:
      return {
        ...state,
        proveedores: action.payload.proveedores,
        items: action.payload.items
      };

    case AGREGAR_NUEVO_PROVEEDOR:
      return {
        ...state,
        proveedores: [...state.proveedores, {nombre: action.payload}]
      };

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

// case DATA_LOAD:
//   return {         
//     ...state,
//     items: action.payload
//   };
  
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
        categoriaMercaderiaRemito: action.payload.categoriaMercaderiaRemito,
        numeroRemito: action.payload.numeroRemito,
        proveedor: action.payload.proveedorSeleccionado,
        fechaRemito: action.payload.fecha
      };



    case LIMPIAR_DATOS_BASE_REMITO:
      return {         
        ...state,
        proveedor: "",
        numeroRemito: ""
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