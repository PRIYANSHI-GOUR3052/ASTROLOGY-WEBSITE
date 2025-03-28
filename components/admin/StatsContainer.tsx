import { FC } from 'react';
import styles from '@/styles/Dashboard.module.css';

const StatsContainer: FC = () => {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <i className="fas fa-users"></i>
        <div>
          <h3>Total Users</h3>
          <p>0</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <i className="fas fa-envelope"></i>
        <div>
          <h3>Contact Requests</h3>
          <p>0</p>
        </div>
      </div>
      <div className={styles.statCard}>
        <i className="fas fa-chart-line"></i>
        <div>
          <h3>Daily Visits</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer; 