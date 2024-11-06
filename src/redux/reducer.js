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
  SACAR_PARTIDA_DE_POSICION,
  ADICION_RAPIDA_A_POSICION,
  AJUSTAR_CANTIDAD_PARTIDA_DE_POSICION,
  OBTENER_MOVIMIENTOS_SIN_REMITO

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
  movimientosSinRemito:[],
  
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
  partidasRemitoSalida:[],
  partidasSalida:[]


};

const rootReducer = (state = initialState, action) => {
switch (action.type) {
  case AJUSTAR_CANTIDAD_PARTIDA_DE_POSICION:
  const { selectedItem, kilos, unidades, id } = action.payload;
  return {
    ...state,
    itemsPosicion: state.itemsPosicion.map(itm => 
      itm.id === selectedItem.id
        ? {
            ...itm,
            kilos: itm.kilos - kilos,
            unidades: itm.unidades - unidades
          }
        : itm
    )
  };
  case ADICION_RAPIDA_A_POSICION:
  return {
    ...state,
    itemsPosicion: [...state.itemsPosicion, {
      itemId: action.payload.item.itemId,
      categoria: action.payload.item.categoria,
      descripcion: action.payload.item.descripcion,
      proveedor: action.payload.proveedor,
      partida: action.payload.partida,
      kilos: action.payload.kilos,
      unidades: action.payload.unidades
    }]
  };
  case SACAR_PARTIDA_DE_POSICION:
    const itemToRemove = action.payload; // Renombramos la variable para evitar conflicto
    return {
      ...state,
      itemsPosicion: state.itemsPosicion.filter(
        itm => !(itm.id === itemToRemove.id && itm.partida === itemToRemove.partida)
      )
    };

  case PARTIDAS_EN_CUARENTENA:   
  return {         
    ...state,
    partidasCuarentena: action.payload
  };
  case CAMBIAR_ESTADO_PARTIDA:
        const [partidaId, nuevoEstado] = action.payload;
        if (nuevoEstado === 'rechazada') {
          return {
            ...state,
            partidasCuarentena: state.partidasCuarentena.filter(
              partida => partida.id !== partidaId
            ),
          };
        }
        return {
          ...state,
          partidasCuarentena: state.partidasCuarentena.map(partida =>
            partida.id === partidaId ? { ...partida, estado: nuevoEstado } : partida
          ),
        };
    case PARTIDAS_A_STOCK:
      return {
        ...state,
        partidasCuarentena: state.partidasCuarentena.filter(p=> p.numeroPartida !== action.payload)
    };

    case OBTENER_MOVIMIENTOS_SIN_REMITO:
      return {
        ...state,
        movimientosSinRemito: action.payload,
      }     
  
      case PARTIDAS_EN_CUARENTENA:
        return {
          ...state,
          partidasCuarentena: action.payload
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
          partidasRemito: [],
          itemSeleccionado:""
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