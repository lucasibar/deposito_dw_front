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


const URL = "https://derwill-deposito-backend.onrender.com"

export const buscarStockPorIdItem =(idItem)=> async dispatch => {
  
  return axios.get(`${URL}/movimientos/total-kilos/${idItem}`)
  .then(data => {

      dispatch({ type: STOCK_ITEM_SELECCIONADO, payload: data.data.totalKilos });
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


export const deletePartidaDelRemito = (numeroPartida) => dispatch => {
  return dispatch({ type: ELIMINAR_PARTIDA_AL_REMITO, payload: numeroPartida });
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


export const agregarNuevoItem =(nuevoItem)=> dispatch => {
    return axios.post(`https://derwill-deposito-backend.onrender.com/items`, nuevoItem)
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



export const subirRemito =(remito)=> dispatch => {
  return axios.post(`${URL}/movimientos/entrada`, remito ) 
  .then(data => {
      console.log(data.data)
        dispatch({ type: SUBIR_DATA_REMITO, payload: data.data });
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