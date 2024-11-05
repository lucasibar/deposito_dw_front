import {
  AGREGAR_PROVEEDOR,
  PROVEEDOR_SELECCIONADO,
  FECHA_SELECCIONADO,
  NUMERO_REMITO_SELECCIONADO,
  GET_PROVEEDORES,
  GET_iTEMS,
  AGREGAR_ITEM,
  AGREGAR_PARTIDA_AL_REMITO,
  DATA_LOAD_PROVEEDORES_ITEMS,
  LIMPIAR_PROVEEDOR_SELECCIONADO,
  POSICIONES_POR_PROVEEDOR,
  FILTRAR_POSICIONESPROVEEDOR_SEGUN_ITEM,
  GET_POSICIONES,
  ITEM_SELECCIONADO,
  RACK_FILA_SELECCIONADOS,
  // DATA_LOAD,
  DATA_BASE_REMITO,
  LIMPIAR_DATOS_BASE_REMITO,
  SUBIR_DATA_REMITO,
  GET_PARTIDAS,
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
  OBTENER_ITEMS_POR_POSICION,
  ADD_TASK,
  FETCH_TASKS,
  COMPLETE_TASK,
  SALIDA_HISTRORIAL,
  STOCK_TOTAL_ITEM_SELECCIONADO,
  PARTIDAS_A_STOCK,
  CAMBIAR_ESTADO_PARTIDA,
  SACAR_PARTIDA_DE_POSICION


  
} from './actions';

const initialState = { 
  items: [],
  proveedores:[],
  
  posiciones: [],
  itemsProveedor: [], 
  proveedorSeleccionado: "",
  rackSeleccionado:"",
  filaSeleccionada: "",
  itemsPosicion: [],
  tareas:[],
  movimientosHistoricoSalida:[],
  partidasCuarentena:[],
  
//esto se limpia con la flecha de NavBar--
  fechaSeleccionado:"",
  numeroRemitoSeleccionado: 0,
  partidasRemito: [],
  posicionesPorProveedor:[],
  itemSeleccionado:"",
//-----------------------------------------

  stockItemSeleccionado: 0,

  categoriaMercaderiaRemito:"",
  partidas: [],
  partidasDeEntradaAPosicion:[],
  partidasPorPosicion:[],
  proximaPartidaConsumo:0,
  partidasRemitoSalida:[]


};

const rootReducer = (state = initialState, action) => {
switch (action.type) {
  case SACAR_PARTIDA_DE_POSICION:
  const selectedItem = action.payload;
  return {
    ...state,
    itemsPosicion: state.itemsPosicion.filter(itm => !(itm.id === selectedItem.id && itm.partida === selectedItem.partida))
  };
  case PARTIDAS_EN_CUARENTENA:   
  return {         
    ...state,
    partidasCuarentena: action.payload
  };
  case CAMBIAR_ESTADO_PARTIDA:
  const [id, estado] = action.payload;
  if (estado === 'rechazada') {
    return {
      ...state,
      partidasCuarentena: state.partidasCuarentena.filter(
        partida => partida.id !== id
      ),
    };
  }
  return {
    ...state,
    partidasCuarentena: state.partidasCuarentena.map(partida => 
      partida.id === id ? { ...partida, estado } : partida
    ),
  };
    case PARTIDAS_A_STOCK:
      return {
        ...state,
        partidasCuarentena: state.partidasCuarentena.filter(p=> p.numeroPartida !== action.payload)
    };
    case STOCK_TOTAL_ITEM_SELECCIONADO:
    return {
      ...state,
      stockItemSeleccionado: action.payload, 
    };
  case SALIDA_HISTRORIAL:
    return {
      ...state,
      movimientosHistoricoSalida: action.payload
    };
  case ADD_TASK:
    return { ...state, tareas: [...state.tareas, action.payload] };
  case FETCH_TASKS:
    return { ...state, tareas: action.payload };
  case COMPLETE_TASK:
    return {
      ...state,
      tasks: state.tareas.map((tarea) =>
        tarea.id === action.payload ? { ...tarea, status: 'completed' } : tarea
      ),
    };
  case OBTENER_ITEMS_POR_POSICION:
      return {
        ...state,
        itemsPosicion: action.payload, // Actualizamos los ítems de la posición seleccionada
      };
  case GET_POSICIONES:
    return {
      ...state,
      posiciones: action.payload
    };
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
    case RACK_FILA_SELECCIONADOS:
      return {
        ...state,
        rackSeleccionado: action.payload.rack,
        filaSeleccionada: action.payload.fila,
      };
    case ITEM_SELECCIONADO:
      return {
        ...state,
        itemSeleccionado: action.payload,
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
    case DATA_LOAD_PROVEEDORES_ITEMS:
      return {
        ...state,
        proveedores: action.payload.proveedores,
        items: action.payload.items
      };
      case LIMPIAR_PROVEEDOR_SELECCIONADO:
        return {
          ...state,
          itemsProveedor: [],
          proveedorSeleccionado: "",
          fechaSeleccionado:"",
          numeroRemitoSeleccionado: 0,
          partidasRemito: []
        }

        case POSICIONES_POR_PROVEEDOR:
          return {
            ...state,
            posicionesPorProveedor: action.payload
          };
          case FILTRAR_POSICIONESPROVEEDOR_SEGUN_ITEM:
            return {
              ...state,
            };
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
 


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