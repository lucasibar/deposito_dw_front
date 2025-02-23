import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import styles from './Charts.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ProveedorPieChart = ({ posiciones }) => {
  // Procesar datos para el gráfico
  const proveedorData = posiciones.reduce((acc, posicion) => {
    posicion.items.forEach(item => {
      const proveedorNombre = item.proveedor?.nombre || 'Sin Proveedor';
      if (!acc[proveedorNombre]) {
        acc[proveedorNombre] = 0;
      }
      acc[proveedorNombre] += item.kilos || 0;
    });
    return acc;
  }, {});

  // Calcular total de kilos
  const totalKilos = Object.values(proveedorData).reduce((sum, kilos) => sum + kilos, 0);

  // Nueva paleta de colores sobria
  const generateColors = (count) => {
    const colors = [
      '#4CAF50',  // Verde principal
      '#757575',  // Gris oscuro
      '#BDBDBD',  // Gris medio
      '#E0E0E0',  // Gris claro
      '#F5F5F5',  // Gris muy claro
      '#2E7D32',  // Verde oscuro
      '#A5D6A7',  // Verde claro
      '#616161',  // Gris más oscuro
    ];
    
    // Si hay más secciones que colores, repetir la paleta
    return Array(count).fill().map((_, i) => colors[i % colors.length]);
  };

  const data = {
    labels: Object.keys(proveedorData),
    datasets: [
      {
        data: Object.values(proveedorData),
        backgroundColor: generateColors(Object.keys(proveedorData).length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            family: "'Roboto', sans-serif",
            size: 12
          },
          color: '#424242'
        }
      },
      title: {
        display: true,
        text: 'Distribución de Kilos por Proveedor',
        font: {
          family: "'Roboto', sans-serif",
          size: 16,
          weight: 'normal'
        },
        color: '#424242',
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#424242',
        bodyColor: '#424242',
        borderColor: '#E0E0E0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Roboto', sans-serif"
        }
      }
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.totalKilos}>
        Total: {totalKilos.toLocaleString('es-AR')} kg
      </div>
      <div>
        <Pie 
          data={data} 
          options={options}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}; 