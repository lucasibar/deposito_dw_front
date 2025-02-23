import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import styles from './LineChart.module.css';

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

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={xAxisKey}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={yAxisKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name={yAxisLabel}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 