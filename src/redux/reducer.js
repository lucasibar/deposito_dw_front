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
  OBTENER_ITEMS_POR_POSICION,
  ADD_TASK,
  FETCH_TASKS,
  COMPLETE_TASK,
  SALIDA_HISTRORIAL,
  STOCK_TOTAL_ITEM_SELECCIONADO,
  CAMBIAR_ESTADO_PARTIDA,
  SACAR_PARTIDA_DE_POSICION,
  ADICION_RAPIDA_A_POSICION,
  AJUSTAR_CANTIDAD_PARTIDA_DE_POSICION,
  OBTENER_MOVIMIENTOS_SIN_REMITO,
  SELECCIONAR_PARTIDA_SALIDA,
  ELIMINAR_PARTIDA_AL_REMITO,
  PARTIDAS_EN_CUARENTENA,
  PARTIDAS_DE_CUARENTENA_A_STOCK
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
  fechaSeleccionado:"",
  numeroRemitoSeleccionado: 0,
  partidasRemito: [],
  posicionesPorProveedor:[],
  itemSeleccionado:"",
  stockItemSeleccionado: 0,
  proximaPartidaConsumo: 0,
  movimientosSalidaRemito: [],
  movimientosSinRemito: []
};

const rootReducer = (state = initialState, action) => {
switch (action.type) {
  case AJUSTAR_CANTIDAD_PARTIDA_DE_POSICION:
    const { selectedItem, kilos, unidades } = action.payload;
    return {
      ...state,
      itemsPosicion: state.itemsPosicion.map(itm => 
        (itm.itemId === selectedItem.itemId && itm.partida === selectedItem.partida)
          ? {
              ...itm,
              kilos: itm.kilos - kilos,
              unidades: parseInt(itm.unidades - unidades)
            }
          : itm
      ).filter(itm => itm.kilos > 0 && itm.unidades > 0)
    };

  
  
  
  
  
  
  case PARTIDAS_DE_CUARENTENA_A_STOCK:

    return {
      ...state,
      partidasCuarentena: state.partidasCuarentena.filter(partida => partida.id !== action.payload[0].partida.id)
    } 



  case SELECCIONAR_PARTIDA_SALIDA:
    const partidaExiste = state.movimientosSalidaRemito.find(
      (p) => p.id === action.payload.id
    );
    return {
      ...state,
      movimientosSalidaRemito: partidaExiste
        ? state.movimientosSalidaRemito.filter((p) => p.id !== action.payload.id)
        : [...state.movimientosSalidaRemito, action.payload],
    };

  case OBTENER_MOVIMIENTOS_SIN_REMITO:
    return {
      ...state,
      movimientosSinRemito: action.payload,
    }   


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
    const itemToRemove = action.payload;
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
      itemsPosicion: action.payload,
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
    };

  case POSICIONES_POR_PROVEEDOR:
    return {
      ...state,
      posicionesPorProveedor: action.payload
    };

  case FILTRAR_POSICIONESPROVEEDOR_SEGUN_ITEM:
    return {
      ...state,
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