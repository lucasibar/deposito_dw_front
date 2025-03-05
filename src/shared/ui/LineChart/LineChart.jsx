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

  const chartData = {
    labels: data.map(item => item[xAxisKey]),
    datasets: [
      {
        label: yAxisLabel,
        data: data.map(item => item[yAxisKey]),
        borderColor: '#8884d8',
        tension: 0.1,
        pointRadius: 0,
        hoverPointRadius: 8,
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
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
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