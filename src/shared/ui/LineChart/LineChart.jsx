import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './LineChart.module.css';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CustomLineChart = ({ 
  data,
  xAxisKey,
  yAxisKey,
  xAxisLabel,
  yAxisLabel,
  title,
  loading,
  error
}) => {
  if (loading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data || data.length === 0) return <div className={styles.empty}>No hay datos disponibles</div>;

  console.log('Datos recibidos en LineChart:', data);

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        console.log('Fecha inválida:', dateStr);
        return dateStr;
      }
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    } catch (error) {
      console.log('Error al formatear fecha:', dateStr, error);
      return dateStr;
    }
  };

  const chartData = {
    labels: data.map(item => {
      console.log('Procesando item:', item);
      return formatDate(item[xAxisKey]);
    }),
    datasets: [
      {
        label: yAxisLabel,
        data: data.map(item => item[yAxisKey]),
        borderColor: '#8884d8',
        tension: 0.1,
        pointRadius: 2,
        hoverPointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return data[index][xAxisKey];
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 15,
        },
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div style={{ height: '400px', width: '100%' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}; 