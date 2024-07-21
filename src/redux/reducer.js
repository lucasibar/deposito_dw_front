import {
  DATA_LOAD,
  AGREGAR_ITEM,
  DATA_BASE_REMITO,
  LIMPIAR_DATOS_BASE_REMITO,
  AGREGAR_PARTIDA_AL_REMITO,
  SUBIR_DATA_REMITO
  } from './actions'

const initialState = { 
  items: [], 
  proveedores:[{name:"Rontaltex", id: 1}, {name:"Galfione", id: 2}],
  
  //REMITO
  numeroRemito:"",
  proveedor:"",
  partidasRemito:[],
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
      return{         
          ...state,
        numeroRemito: action.payload.numeroRemito,
        proveedor: action.payload.proveedor
      }
      
      case LIMPIAR_DATOS_BASE_REMITO:
      return{         
          ...state,
        proveedor: "",
        numeroRemito:"",
      }

      //ITEMS
      case AGREGAR_ITEM:   
      return{         
          ...state,
         items: [...state.items, action.payload]
      }
      case SUBIR_DATA_REMITO:
        return{         
            ...state,
          numeroRemito: action.payload.numeroRemito,
          proveedor: action.payload.proveedor
        }

      //PARTIDAS
      case AGREGAR_PARTIDA_AL_REMITO:   
      return{         
          ...state,
         partidasRemito: [...state.partidasRemito, action.payload],
      }
      // case ELIMINAR_PARTIDA_AL_REMITO:   
      // return{         
      //     ...state,
      //    partidas: state.partidas.filter(p=> p.numeroPartida== action.payload)
      // }


        default: return state
  };
  };

  export default rootReducer;