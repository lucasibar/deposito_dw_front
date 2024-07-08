import axios from 'axios' 
export const DATA_LOAD= "DATA_LOAD" 
export const AGREGAR_CAJA= "AGREGAR_CAJA" 
export const AGREGAR_CAJA_CUARENTENA= "AGREGAR_CAJA_CUARENTENA" 
export const STOCKEAR_CAJA= "STOCKEAR_CAJA" 

const items = [
    {
        id:1,
        idProveedor:1, //Rontaltex
        descripcion: "algodon blanco optico 16/1",
        tono: null,
        codigoColor: "2011",
        material: "algodon",
        espesorHilado: "16/1",
        categoria:"caliente",
        activo: true
    },
    {
        id:2,
        idProveedor:1, //Rontaltex
        descripcion: "algodon negro 20/1",
        tono: null,
        codigoColor: "2821",
        material: "algodon",
        espesorHilado: "20/1",
        categoria:"caliente",
        activo: true
    },
    {
        id:3,
        idProveedor:2, //Galfione
        descripcion: "algodon blanco optico 16/1",
        tono: null,
        codigoColor: "20",
        material: "algodon",
        espesorHilado: "16/1",
        categoria:"caliente",
        activo: true
    },
    {
        id:4,
        idProveedor:2, //Galfione
        descripcion: "algodon negro reactivo 20/1",
        tono: null,
        codigoColor: "negro 23d",
        material: "algodon",
        espesorHilado: "20/1",
        categoria:"caliente",
        activo: true
    },
]
export const dataLoad =()=>dispatch => {
    return dispatch({type: DATA_LOAD, payload: items })

}

export const agragarCaja =(caja)=>dispatch => {
    return dispatch({type: AGREGAR_CAJA, payload: caja })

}

export const agragarCajaCuarentena =(caja)=>dispatch => {
    return dispatch({type: AGREGAR_CAJA_CUARENTENA})

}

export const stockerCaja =(caja)=>dispatch => {
    return dispatch({type: STOCKEAR_CAJA, payload: caja })

}