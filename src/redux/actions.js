import axios from 'axios' 
import Swal from 'sweetalert2'
export const DATA_LOAD= "DATA_LOAD" 
export const DATA_BASE_REMITO= "DATA_BASE_REMITO" 
export const AGREGAR_ITEM= "AGREGAR_ITEM" 
export const LIMPIAR_DATOS_BASE_REMITO= "LIMPIAR_DATOS_BASE_REMITO" 
export const AGREGAR_PARTIDA_AL_REMITO = "AGREGAR_PARTIDA_AL_REMITO"
export const ELIMINAR_PARTIDA_AL_REMITO = "ELIMINAR_PARTIDA_AL_REMITO"
export const SUBIR_DATA_REMITO = "SUBIR_DATA_REMITO"

const URL = process.env.BASE_URL_SERVIDOR

export const agregarNuevoItem =(nuevoItem)=> dispatch => {
    console.log(nuevoItem)
    return axios.post(`http://localhost:3001/items`, nuevoItem)
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







export const subirPartidasDelRemito =(partidas)=> dispatch => {
    return axios.post(`http://localhost:3001/partidas/remito`, partidas )
    .then(data => {
        dispatch({ type: SUBIR_DATA_REMITO, payload: data.data });
    })
    .catch(error => {
        console.error("Error in datosBaseRemito:", error);
    });};

export const dataLoad =()=>dispatch => {
    return axios.get(`http://localhost:3001/items`)
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