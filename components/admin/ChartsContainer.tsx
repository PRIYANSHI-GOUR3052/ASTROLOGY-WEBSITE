import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const ChartsContainer: FC = () => {
  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chart}>
        <h3>User Growth</h3>
        <div className={styles.chartPlaceholder}>
          <p>Chart will be implemented here</p>
        </div>
      </div>
      <div className={styles.chart}>
        <h3>Daily Activity</h3>
        <div className={styles.chartPlaceholder}>
          <p>Chart will be implemented here</p>
        </div>
      </div>
    </div>
  );
};

export default ChartsContainer; 