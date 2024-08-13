import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PalletPDF from '../components/ArmadoPallets/PalletPDF/PalletPDF';
import axios from 'axios' 
import Swal from 'sweetalert2'
export const DATA_LOAD= "DATA_LOAD" 
export const DATA_BASE_REMITO= "DATA_BASE_REMITO" 
export const AGREGAR_ITEM= "AGREGAR_ITEM" 
export const LIMPIAR_DATOS_BASE_REMITO= "LIMPIAR_DATOS_BASE_REMITO" 
export const AGREGAR_PARTIDA_AL_REMITO = "AGREGAR_PARTIDA_AL_REMITO"
export const ELIMINAR_PARTIDA_AL_REMITO = "ELIMINAR_PARTIDA_AL_REMITO"
export const SUBIR_DATA_REMITO = "SUBIR_DATA_REMITO"
export const PARTIDAS_SIN_PALLET_ASIGNADO = "PARTIDAS_SIN_PALLET_ASIGNADO"
export const GET_PARTIDAS = "GET_PARTIDAS"
export const AGREGAR_PALLET_A_LISTA_PARA_SUBIR = 'AGREGAR_PALLET_A_LISTA_PARA_SUBIR';
export const SUBMIT_PALLETS = 'SUBMIT_PALLETS';
export const STOCK_ITEM_SELECCIONADO = 'STOCK_ITEM_SELECCIONADO';
export const PARTIDAS_EN_CUARENTENA = 'PARTIDAS_EN_CUARENTENA';
export const AGREGAR_KILOS_DE_PARTIDA_A_POSICION = 'AGREGAR_KILOS_DE_PARTIDA_A_POSICION';
export const ELIMINAR_KILOS_ASIGNADOS_A_POSICION = 'ELIMINAR_KILOS_ASIGNADOS_A_POSICION';
export const STOCK_ITEM_POSICION = 'STOCK_ITEM_POSICION';
export const LIMPIAR_ESTADO_REDUCER = 'LIMPIAR_ESTADO_REDUCER';


 export const URL = "https://derwill-deposito-backend.onrender.com"
// export const URL = "http://localhost:3001"

//----------------------------------------------------------------------------------
export const movimientoEntradaPosicion2 =(movimiento)=>dispatch => {
  console.log(movimiento)
return axios.post(`${URL}/movimientos/entrada-posicion`, movimiento ) 
.then(data => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: data.message,
    showConfirmButton: false,
    timer: 1500
  });
  })
  .catch(error => {
      console.error("Error in datosBaseRemito:", error);
  });
}

export const movimientoPosicion1Posicion2 =(movimiento)=>dispatch => {
return axios.post(`${URL}/movimientos/interno`, movimiento ) 
.then(data => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: data.message,
    showConfirmButton: false,
    timer: 1500
  });
  })
  .catch(error => {
      console.error("Error in datosBaseRemito:", error);
  });
}

//----------------------------------------------------------------------------------

export const buscarStockPorPosicion =(dataPosicion)=> async dispatch => {
  return axios.post(`${URL}/stock/posicion`, dataPosicion)
  .then(data => {
    if(data.data.length == 0){Swal.fire({
      title: "Posicion vacia",
      showClass: {
        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
      },
      hideClass: {
        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
      }
    })}
      dispatch({ type: STOCK_ITEM_POSICION, payload: data.data });
  })
  .catch(error => {
    Swal.fire({
      title: "No se pudo encontrar el item",
      showClass: {
        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
      },
      hideClass: {
        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
      }
    })
  })
};




//----------------------------------------------------------------------------------

export const limpiarEstadoReducer =(movimiento)=>dispatch => {
  return dispatch({type: LIMPIAR_ESTADO_REDUCER })
}

export const agragarKilosPartidaAPosicion =(movimiento)=>dispatch => {
  return dispatch({type: AGREGAR_KILOS_DE_PARTIDA_A_POSICION, payload: movimiento })
}
export const deleteKilosDePosicion = (partidaPosicion) => dispatch => {
  return dispatch({ type: ELIMINAR_KILOS_ASIGNADOS_A_POSICION, payload: partidaPosicion });
};

//----------------------------------------------------------------------------------
export const agregarNuevoItem =(nuevoItem)=> dispatch => {  
  return axios.post(`${URL}/items`, nuevoItem)
  .then(data => {
      dispatch({ type: AGREGAR_ITEM, payload: data.data });
  })
  .catch(error => {
      Swal.fire({
          title: "No se pudo crear el item",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
  });
};

export const deletePartidaDelRemito = (numeroPartida) => dispatch => {
  return dispatch({ type: ELIMINAR_PARTIDA_AL_REMITO, payload: numeroPartida });
};

export const subirRemito =(remito)=> dispatch => {
  return axios.post(`${URL}/movimientos/remito-entrada`, remito ) 
  .then(data => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: data.message,
      showConfirmButton: false,
      timer: 1500
    });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });
  }

export const partidasEnCuarentena =()=> dispatch => {  
    return axios.get(`${URL}/partidas/cuarentena`)
    .then(data => {
        dispatch({ type: PARTIDAS_EN_CUARENTENA, payload: data.data });
    })
    .catch(error => {
        Swal.fire({
            title: "No hay partidas en cuarentena",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    });
  };

  export const partidaAprobada =(partida)=> dispatch => {  
    return axios.put(`${URL}/partidas/cuarentena-stock`, partida)
    .then(data => {
        dispatch({ type: PARTIDAS_EN_CUARENTENA, payload: data.data });
    })
    .catch(error => {
        Swal.fire({
            title: "No hay partidas en cuarentena",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    });
  };







//-----------------------------------------------------------------------------------------------------------------------------------
export const buscarStockPorIdItem =(idItem)=> async dispatch => {
  
  return axios.get(`${URL}/stock/${idItem}`)
  .then(data => {
      dispatch({ type: STOCK_ITEM_SELECCIONADO, payload: data.data });
  })
  .catch(error => {
    Swal.fire({
      title: "No se pudo encontrar el item",
      showClass: {
        popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
      },
      hideClass: {
        popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
      }
    })
  })
};





export const submitGeneratedPallets = (pallets) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/armadopallets`, pallets);

    const generatedPdfs = await Promise.all(
      pallets.map(async (pallet) => {
        const blob = await pdf(<PalletPDF pallet={pallet} />).toBlob();
        return {
          filename: `pallet-${pallet.id}.pdf`,
          blob,
        };
      })
    );

    generatedPdfs.forEach((pdf) => {
      saveAs(pdf.blob, pdf.filename);
    });

    dispatch({ type: 'SUBMIT_PALLETS' });
  } catch (error) {
    console.error('Error generating pallets:', error);
  }
}

  
  export const addPallet =(pallet)=>dispatch => {
    return dispatch({type: AGREGAR_PALLET_A_LISTA_PARA_SUBIR, payload: pallet })

}




export const getPartidas =()=> dispatch => {
    return axios.get(`${URL}/partidas`) 
    .then(data => {
        dispatch({ type: GET_PARTIDAS, payload: data.data });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });};

export const partidasSinPallet =()=> dispatch => {
    return axios.get(`${URL}/partidas/sinpallet`) 
    .then(data => {
        dispatch({ type: PARTIDAS_SIN_PALLET_ASIGNADO, payload: data.data });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });};




export const dataLoad =()=>dispatch => {
    return axios.get(`${URL}/items`)
    .then(data => {
        dispatch({ type: DATA_LOAD, payload: data.data });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });
};


export const datosBaseRemito =(datosBaseRemito)=> dispatch => {
    return dispatch({ type: DATA_BASE_REMITO, payload: datosBaseRemito });
};

export const agragarPartidaAlRemito =(partida)=>dispatch => {
    return dispatch({type: AGREGAR_PARTIDA_AL_REMITO, payload: partida })

}
// export const deletePartidaDelRemito =(numeroPartida)=>dispatch => {
//     return dispatch({type: ELIMINAR_PARTIDA_AL_REMITO, payload: numeroPartida })

// }

export const limpiarDatosRemito =(datosBaseRemito)=> dispatch => {
    return dispatch({ type: LIMPIAR_DATOS_BASE_REMITO, payload: datosBaseRemito });
};   