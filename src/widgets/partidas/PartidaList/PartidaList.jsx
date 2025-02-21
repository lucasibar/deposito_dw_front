// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectPartidas, selectStatus, selectError } from '../../../features/partidas/model/selectors';
// import { Loading } from '../../../shared/ui/Loading/Loading';
// import { ErrorPopup } from '../../../shared/ui/ErrorPopup/ErrorPopup';
// import styles from './PartidaList.module.css';

// export const PartidaList = ({ searchTerms }) => {
//   const partidas = useSelector(selectPartidas);
//   const status = useSelector(selectStatus);
//   const error = useSelector(selectError);
//   const [showError, setShowError] = useState(false);

//   // Mostrar el error cuando cambia
//   React.useEffect(() => {
//     if (error) {
//       setShowError(true);
//     }
//   }, [error]);

//   if (status === 'loading') {
//     return <Loading />;
//   }

//   const filteredPartidas = searchTerms.length > 0
//     ? partidas.filter(partida => {
//         const searchableText = `${partida.numero} ${partida.cliente} ${partida.tipo}`.toLowerCase();
//         return searchTerms.every(term => searchableText.includes(term));
//       })
//     : partidas;

//   return (
//     <>
//       {showError && (
//         <ErrorPopup 
//           message={error || 'Ocurrió un error al cargar las partidas'} 
//           onClose={() => setShowError(false)} 
//         />
//       )}

//       <div className={styles.listContainer}>
//         {filteredPartidas.length > 0 ? (
//           filteredPartidas.map((partida) => (
//             <div key={partida.id} className={styles.partidaItem}>
//               <h3>Partida: {partida.numero}</h3>
//               <p>Cliente: {partida.cliente}</p>
//               <p>Tipo: {partida.tipo}</p>
//               <p>Estado: {partida.estado}</p>
//             </div>
//           ))
//         ) : (
//           <div className={styles.emptyMessage}>
//             No hay mercadería disponible
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// Componente temporal para pruebas
export const PartidaList = () => {
  return <div>Lista de Partidas (temporalmente deshabilitada)</div>;
}; 