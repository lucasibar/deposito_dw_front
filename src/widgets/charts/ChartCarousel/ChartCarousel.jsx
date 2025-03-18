import { Carousel } from '../../../shared/ui/Carousel/Carousel';
import { ProveedorPieChart } from '../components/ProveedorPieChart';
import { DescripcionPieChart } from '../components/DescripcionPieChart';
import styles from './ChartCarousel.module.css';

export const ChartCarousel = ({ posiciones }) => {
  const charts = [
    <ProveedorPieChart key="proveedor" posiciones={posiciones} />,
    <DescripcionPieChart key="descripcion" posiciones={posiciones} />
  ];

  return (
    <div className={styles.chartCarousel}>
      <Carousel>
        {charts.map((chart, index) => (
          <div key={index} className={styles.chartContainer}>
            {chart}
          </div>
        ))}
      </Carousel>
    </div>
  );
}; 