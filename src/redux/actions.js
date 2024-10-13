import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import PalletPDF from '../components/ArmadoPallets/PalletPDF/PalletPDF';
import axios from 'axios' 
import Swal from 'sweetalert2'
export const AGREGAR_PROVEEDOR = 'AGREGAR_PROVEEDOR';
export const PROVEEDOR_SELECCIONADO= "PROVEEDOR_SELECCIONADO" 
export const FECHA_SELECCIONADO = 'FECHA_SELECCIONADO';
export const NUMERO_REMITO_SELECCIONADO = 'NUMERO_REMITO_SELECCIONADO';
export const GET_PROVEEDORES = 'GET_PROVEEDORES';
export const GET_iTEMS = 'GET_iTEMS';
export const AGREGAR_ITEM= "AGREGAR_ITEM" 
export const AGREGAR_PARTIDA_AL_REMITO = "AGREGAR_PARTIDA_AL_REMITO"

//export const URL = "https://derwill-deposito-backend.onrender.com"
export const URL = "http://localhost:3001"


export const getProveedores =()=>dispatch => {
  return axios.get(`${URL}/proveedores`)
  .then(data => {
      dispatch({ type: GET_PROVEEDORES, payload: data.data });
  })
  .catch(error => {
    console.error("Error in datosBaseRemito:", error);
});
};
export const getItems =(proveedor)=>dispatch => {
  return axios.get(`${URL}/items/${proveedor.id}`)
  .then(data => {
      dispatch({ type: GET_iTEMS, payload: data.data });
  })
  .catch(error => {
    console.error("Error in datosBaseRemito:", error);
});
};
export const generarNuevoProveedor =(nombre)=>dispatch => {
  return axios.post(`${URL}/proveedores/${nombre}`) 
  .then(data => {
    dispatch({ type: AGREGAR_PROVEEDOR, payload: data.data });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se genero el proveedor",
      showConfirmButton: false,

    });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });
}

//estos tres hay que arreglar para que sea una peticion------
export const seleccionarProveedor =(proveedor)=> dispatch => {  
  return dispatch({type: PROVEEDOR_SELECCIONADO, payload: proveedor })
};
export const seleccionarFecha =(fecha)=> dispatch => {  
  return dispatch({type: FECHA_SELECCIONADO, payload: fecha })
};
export const seleccionarNumeroRemito =(numeroRemito)=> dispatch => {  
  return dispatch({type: NUMERO_REMITO_SELECCIONADO, payload: numeroRemito })
};
//-----------------------------------------------------------

export const agregarNuevoItem =(nuevoItem)=> dispatch => {  
  return axios.post(`${URL}/items`, nuevoItem)
  .then(data => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se genero el item",
      showConfirmButton: false,
      
    });
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

export const agragarPartidaAlRemito =(partida)=>dispatch => {
  return dispatch({type: AGREGAR_PARTIDA_AL_REMITO, payload: partida })
}

export const subirRemitoBDD =(remito)=> dispatch => {
  return axios.post(`${URL}/movimientos/remito-entrada`, remito ) 
  .then(data => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se cargo correctamente el remito",
      showConfirmButton: false,
      timer: 1500
    });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });
  }

//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------
export const DATA_LOAD_REMITO= "DATA_LOAD_REMITO" 
export const DATA_BASE_REMITO= "DATA_BASE_REMITO" 
export const LIMPIAR_DATOS_BASE_REMITO= "LIMPIAR_DATOS_BASE_REMITO" 
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
export const AGREGAR_AL_REMITO_SALIDA = 'AGREGAR_AL_REMITO_SALIDA';
export const ELIMINAR_PARTIDA_AL_REMITO_SALIDA = 'ELIMINAR_PARTIDA_AL_REMITO_SALIDA';
export const AGREGAR_NUEVO_PROVEEDOR = 'AGREGAR_NUEVO_PROVEEDOR';

export const dataRemitoLoad =()=>dispatch => {
  return axios.get(`${URL}/remitos/dataload-remito-recepcion`)
  .then(data => {
      dispatch({ type: DATA_LOAD_REMITO, payload: data.data });
  })
  .catch(error => {
      console.error("Error in dataRemitoLoad:", error);
  });
};



  export const agregarNuevoProveedor =(nuevoProveedor)=> dispatch => {  
    return dispatch({type: AGREGAR_NUEVO_PROVEEDOR, payload: nuevoProveedor })
  };

//------------------------------------------------------------------------------------------------------------------
export const agragarAlRemitoDeSalida =(mercaderia_posicion)=>dispatch => {
  return dispatch({type: AGREGAR_AL_REMITO_SALIDA, payload: mercaderia_posicion })

}


export const deletePartidaSalida = (mercaderia) => dispatch => {
  return dispatch({ type: ELIMINAR_PARTIDA_AL_REMITO_SALIDA, payload: mercaderia });
};

export const subirRemitoSalida =(remitoSalida)=> dispatch => {
  console.log(remitoSalida)
  return axios.post(`${URL}/movimientos/remito-salida`, remitoSalida ) 
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
};



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



export const agragarKilosPartidaAPosicion =(movimiento)=>dispatch => {
  return dispatch({type: AGREGAR_KILOS_DE_PARTIDA_A_POSICION, payload: movimiento })
}
export const deleteKilosDePosicion = (partidaPosicion) => dispatch => {
  return dispatch({ type: ELIMINAR_KILOS_ASIGNADOS_A_POSICION, payload: partidaPosicion });
};

//----------------------------------------------------------------------------------


export const deletePartidaDelRemito = (numeroPartida) => dispatch => {
  return dispatch({ type: ELIMINAR_PARTIDA_AL_REMITO, payload: numeroPartida });
};



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






export const datosBaseRemito =(datosBaseRemito)=> dispatch => {
    return dispatch({ type: DATA_BASE_REMITO, payload: datosBaseRemito });
};


// export const deletePartidaDelRemito =(numeroPartida)=>dispatch => {
//     return dispatch({type: ELIMINAR_PARTIDA_AL_REMITO, payload: numeroPartida })

// }

export const limpiarDatosRemito =(datosBaseRemito)=> dispatch => {
    return dispatch({ type: LIMPIAR_DATOS_BASE_REMITO, payload: datosBaseRemito });
};   