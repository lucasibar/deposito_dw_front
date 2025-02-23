import { useState } from 'react';
import styles from './Carousel.module.css';

export const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Array.isArray(children) ? children : [children];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.arrowButton} onClick={prevSlide}>
        &lt;
      </button>
      
      <div className={styles.slideContainer}>
        {items[currentIndex]}
      </div>

      <button className={styles.arrowButton} onClick={nextSlide}>
        &gt;
      </button>
      
      <div className={styles.dots}>
        {items.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}; 